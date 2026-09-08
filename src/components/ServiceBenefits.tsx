import { 
  Flame, 
  ShieldCheck, 
  Users, 
  Truck, 
  Smartphone 
} from 'lucide-react';
import { SERVICE_BENEFITS } from '../data/restaurantData';

export default function ServiceBenefits() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Flame':
        return <Flame className="w-5 h-5" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5" />;
      case 'Users':
        return <Users className="w-5 h-5" />;
      case 'Truck':
        return <Truck className="w-5 h-5" />;
      case 'Smartphone':
        return <Smartphone className="w-5 h-5" />;
      default:
        return <Flame className="w-5 h-5" />;
    }
  };

  return (
    <section className="relative z-20 -mt-6 sm:-mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl shadow-[#151515]/5 border border-[#E7E0D8]">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[#E7E0D8]/60">
          {SERVICE_BENEFITS.map((item, index) => (
            <div
              key={item.id}
              className={`flex items-start gap-3 sm:gap-3.5 group ${
                index > 0 ? 'pt-3 sm:pt-0 sm:pl-4 lg:pl-6' : ''
              }`}
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#FAF7F2] border border-[#E7E0D8] text-[#D95F25] flex items-center justify-center flex-shrink-0 group-hover:bg-[#D95F25] group-hover:text-white group-hover:border-[#D95F25] transition-all duration-300 shadow-xs">
                {getIcon(item.icon)}
              </div>
              <div className="flex flex-col">
                <h2 className="text-sm font-bold text-[#151515] group-hover:text-[#D95F25] transition-colors leading-snug font-sans">
                  {item.title}
                </h2>
                <p className="text-xs text-[#77716B] leading-relaxed mt-0.5">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
