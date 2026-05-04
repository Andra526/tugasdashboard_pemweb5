import { useEffect } from "react";
import Header from "../component/Header";
import { Outlet, Link, useLocation } from "react-router-dom"; 
import Partner from "./SponsorPartner";
import { 
  Home, 
  Users, 
  Trophy, 
  Briefcase, 
  Mic2, 
  Globe, 
  Video 
} from "lucide-react";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default function MainLayout() {
  return (
    <>
      <ScrollToTop />

      <Header />

      <main className="py-24 container mx-auto px-4">
        <Outlet />
      </main>

      <Partner />

      <footer className="bg-[#fce8ef] pt-12 pb-0 font-sans">
        <div className="max-w-6xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-10 pb-10">

          {/* Logo */}
          <div className="flex flex-col">
            <span className="text-2xl font-black text-[#7B1D3F]">INVOFEST</span>
            <span className="text-[10px] text-[#7B1D3F] leading-tight uppercase tracking-wider">
              Informatics Vocational Festival
            </span>
          </div>

          {/* Menu Navigasi */}
          <div>
            <h4 className="text-xs font-bold text-gray-700 tracking-widest uppercase mb-5">
              Menu Navigasi
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Beranda", icon: <Home size={18} />, path: "/" },
                { label: "Seminar", icon: <Users size={18} />, path: "/seminar" },
                { label: "Competition", icon: <Trophy size={18} />, path: "/competition" },
                { label: "Workshop", icon: <Briefcase size={18} />, path: "/workshop" },
                { label: "Talkshow", icon: <Mic2 size={18} />, path: "/talkshow" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    className="text-gray-600 text-sm flex items-center gap-3 hover:text-[#7B1D3F] transition-all duration-200 group"
                  >
                    <span className="group-hover:scale-110 transition-transform">
                      {item.icon}
                    </span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ikuti Kami */}
          <div>
            <h4 className="text-xs font-bold text-gray-700 tracking-widest uppercase mb-5">
              Ikuti Kami
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-gray-600 text-sm flex items-center gap-3 hover:text-[#7B1D3F]">
                  <Globe size={18} /> Instagram
                </a>
              </li>
              <li>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="text-gray-600 text-sm flex items-center gap-3 hover:text-[#7B1D3F]">
                  <Video size={18} /> Youtube
                </a>
              </li>
            </ul>
          </div>

          {/* Map */}
          <div>
            <h4 className="text-xs font-bold text-gray-700 tracking-widest uppercase mb-5">
              Alamat
            </h4>
            <div className="rounded-xl overflow-hidden border border-pink-200 shadow-sm w-full h-36">
              <iframe
                title="Lokasi INVOFEST"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.026462706346!2d109.10515157475659!3d-6.8874136931116!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6fb9e2230ba97d%3A0x7d6796417730e698!2sPoliteknik%20Harapan%20Bersama!5e0!3m2!1sid!2sid!4v1714100000000!5m2!1sid!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="border-t border-pink-200 px-8 py-4 flex justify-between items-center">
          <p className="text-gray-500 text-[10px]">
            © {new Date().getFullYear()} INVOFEST. All Rights Reserved.
          </p>
          <div className="flex gap-2">
             <div className="p-1.5 bg-[#7B1D3F] text-white rounded hover:bg-[#5a1530] transition-colors cursor-pointer">
               <Video size={14}/>
             </div>
             <div className="p-1.5 bg-[#7B1D3F] text-white rounded hover:bg-[#5a1530] transition-colors cursor-pointer">
               <Globe size={14}/>
             </div>
          </div>
        </div>
      </footer>
    </>
  );
}