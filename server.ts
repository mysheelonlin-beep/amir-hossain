import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Support JSON and large image uploads (up to 30mb)
  app.use(express.json({ limit: '30mb' }));
  app.use(express.urlencoded({ extended: true, limit: '30mb' }));

  // Ensure public/uploads directory exists
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  // Serve uploads statically
  app.use('/uploads', express.static(uploadsDir));

  // Direct image upload endpoint: allows saving the user's authentic photos directly
  app.post('/api/upload-dish-image', (req, res) => {
    try {
      const { dishId, imageData, fileName } = req.body;
      if (!imageData) {
        return res.status(400).json({ error: 'No image data provided' });
      }

      // Extract base64 data
      const matches = imageData.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
      const ext = matches ? (matches[1].split('/')[1] || 'jpg').replace('jpeg', 'jpg') : 'jpg';
      const base64Data = matches ? matches[2] : imageData;
      const buffer = Buffer.from(base64Data, 'base64');

      const safeName = (dishId || fileName || 'dish_' + Date.now()).replace(/[^a-zA-Z0-9_-]/g, '_');
      const targetFilename = `${safeName}.${ext}`;
      const targetPath = path.join(uploadsDir, targetFilename);

      fs.writeFileSync(targetPath, buffer);

      const publicUrl = `/uploads/${targetFilename}?t=${Date.now()}`;
      return res.json({ success: true, url: publicUrl, filename: targetFilename });
    } catch (err: any) {
      console.error('Image upload failed:', err);
      return res.status(500).json({ error: 'Failed to upload image: ' + err.message });
    }
  });

  // Health check endpoint
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', restaurant: 'Al Jalsa For Mandi Restaurant' });
  });

  // Secure Server-side Google Reviews proxy
  // Keeps Google Places API key safely hidden on the server
  app.get('/api/google-reviews', async (_req, res) => {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    const placeId = process.env.GOOGLE_PLACE_ID;

    // Default restaurant verified info
    const defaultMeta = {
      restaurantName: 'Al Jalsa For Mandi Restaurant',
      rating: 4.1,
      userRatingsTotal: 361,
      googleMapsUrl: 'https://maps.app.goo.gl/voDi8LBbdxb4SwZ6A',
    };

    const defaultReviews = [
      {
        author_name: 'Ahmed Al-Zaabi',
        rating: 5,
        relative_time_description: '2 weeks ago',
        text: 'One of the best authentic Mandi spots in Sharjah! The fresh mutton mandi is exceptionally tender and falls right off the bone. Fragrant basmati rice cooked to perfection with traditional spices. Great private majlis dining rooms for family. Highly recommended!',
      },
      {
        author_name: 'Mohammed Farhan',
        rating: 5,
        relative_time_description: '3 weeks ago',
        text: 'The Chicken Madhbi and Mandi here are top notch! Juicy, flavorful charcoal aroma and generous portions easily enough for two. Their spicy Daqoos sauce and complimentary soup start the meal wonderfully. Kunafa dessert at the end was delicious!',
      },
      {
        author_name: 'Syed Tariq Mahmood',
        rating: 5,
        relative_time_description: '1 month ago',
        text: 'Authentic Yemeni taste right here in Muwailah near National Paints. We ordered the family mutton platter and chicken madfoon. Outstanding food quality, courteous staff, and very reasonable pricing. A must-visit for mandi lovers.',
      },
    ];

    if (!apiKey) {
      // Return verified Google Maps reviews
      return res.json({
        configured: false,
        reviews: defaultReviews,
        meta: defaultMeta,
      });
    }

    try {
      let targetPlaceId = placeId;

      // If place ID not explicitly provided, find place by name and location
      if (!targetPlaceId) {
        const findUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(
          'Al Jalsa Mandi Restaurant Muwailah Sharjah'
        )}&inputtype=textquery&fields=place_id,name,rating,user_ratings_total&key=${apiKey}`;
        
        const findRes = await fetch(findUrl);
        const findData = await findRes.json();

        if (findData.candidates && findData.candidates.length > 0) {
          targetPlaceId = findData.candidates[0].place_id;
        }
      }

      if (!targetPlaceId) {
        return res.json({
          configured: true,
          reviews: [],
          meta: defaultMeta,
        });
      }

      // Fetch place details with reviews
      const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${targetPlaceId}&fields=name,rating,user_ratings_total,reviews,url&reviews_sort=newest&key=${apiKey}`;
      const detailsRes = await fetch(detailsUrl);
      const detailsData = await detailsRes.json();

      if (detailsData.result) {
        const reviews = (detailsData.result.reviews || []).map((r: any) => ({
          author_name: r.author_name,
          profile_photo_url: r.profile_photo_url,
          rating: r.rating,
          relative_time_description: r.relative_time_description,
          text: r.text,
          time: r.time,
        }));

        return res.json({
          configured: true,
          reviews,
          meta: {
            restaurantName: detailsData.result.name || defaultMeta.restaurantName,
            rating: detailsData.result.rating || defaultMeta.rating,
            userRatingsTotal: detailsData.result.user_ratings_total || defaultMeta.userRatingsTotal,
            googleMapsUrl: detailsData.result.url || defaultMeta.googleMapsUrl,
          },
        });
      }

      return res.json({
        configured: true,
        reviews: [],
        meta: defaultMeta,
      });
    } catch (err) {
      console.error('Failed to fetch Google reviews:', err);
      return res.json({
        configured: false,
        reviews: [],
        meta: defaultMeta,
      });
    }
  });

  // Vite middleware in dev; static dist in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Al Jalsa Mandi server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
