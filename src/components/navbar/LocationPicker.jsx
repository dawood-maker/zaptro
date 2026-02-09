// import { MapPin, ChevronDown } from "lucide-react";
// import { useState, useRef, useEffect } from "react";

// function LocationPicker({ mobile = false, userLocation, loading }) {
//   const [openDropdown, setOpenDropdown] = useState(false);
//   const dropdownRef = useRef(null);

//   // Click outside to close dropdown
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setOpenDropdown(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div className="relative" ref={dropdownRef}>
//       <div
//         onClick={() => setOpenDropdown(!openDropdown)}
//         className={`flex items-center gap-2 px-3 py-2 rounded-lg 
//                     bg-white/10 hover:bg-white/20 cursor-pointer
//                     transition-all duration-200
//                     ${mobile ? "w-full justify-between" : "hidden md:flex"}`}
//       >
//         <MapPin className="w-5 h-5 text-yellow-400 flex-shrink-0" />

//         <div className={`text-sm flex-1 ${mobile ? "truncate" : ""}`}>
//           {loading ? (
//             <div className="flex items-center gap-2">
//               <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//               <span className="opacity-70">Loading...</span>
//             </div>
//           ) : userLocation ? (
//             <div>
//               <p className="font-medium leading-tight">
//                 {userLocation.country}
//               </p>
//               <p className="text-xs opacity-80 leading-tight">
//                 {userLocation.region}
//               </p>
//             </div>
//           ) : (
//             <span className="opacity-90">Add Address</span>
//           )}
//         </div>

//         <ChevronDown
//           className={`w-4 h-4 opacity-70 flex-shrink-0 transition-transform duration-200 
//                       ${openDropdown ? "rotate-180" : ""}`}
//         />
//       </div>

//       {/* Dropdown Menu */}
//       {openDropdown && (
//         <div className="absolute top-full left-0 mt-2 w-64 bg-gray-900 text-white rounded-lg shadow-2xl border border-white/10 overflow-hidden z-50">
//           {/* Current Location Section */}
//           {userLocation && (
//             <div className="p-4 border-b border-white/10">
//               <h3 className="text-xs uppercase tracking-wider opacity-60 mb-2">
//                 Current Location
//               </h3>
//               <div className="flex items-start gap-3">
//                 <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
//                 <div>
//                   <p className="font-semibold text-sm">{userLocation.city}</p>
//                   <p className="text-xs opacity-80">{userLocation.region}</p>
//                   <p className="text-xs opacity-60">{userLocation.country}</p>
//                   <p className="text-xs opacity-40 mt-1">
//                     IP: {userLocation.ip}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Popular Cities Section */}
//           <div className="p-2">
//             <h3 className="px-3 py-2 text-xs uppercase tracking-wider opacity-60">
//               Popular Cities
//             </h3>
//             <button
//               onClick={() => {
//                 console.log("Selected: Karachi");
//                 setOpenDropdown(false);
//               }}
//               className="w-full text-left px-3 py-2 hover:bg-white/10 rounded transition-colors"
//             >
//               <p className="font-medium text-sm">lahor</p>
//               <p className="text-xs opacity-60">Sindh, Pakistan</p>
//             </button>
//           </div>

//           {/* Search Location Button */}
//           <div className="p-2 border-t border-white/10">
//             <button
//               onClick={() => {
//                 console.log("Search for location");
//                 setOpenDropdown(false);
//               }}
//               className="w-full px-3 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-medium rounded transition-colors text-sm"
//             >
//               📍 Search for Location
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default LocationPicker;

import { MapPin, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

function LocationPicker({ mobile = false, city, loading }) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        onClick={() => setOpenDropdown(!openDropdown)}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg 
                    bg-white/10 hover:bg-white/20 cursor-pointer
                    transition-all duration-200
                    ${mobile ? "w-full justify-between" : "hidden md:flex"}`}
      >
        <MapPin className="w-5 h-5 text-yellow-400 flex-shrink-0" />

        <div className={`text-sm flex-1 ${mobile ? "truncate" : ""}`}>
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span className="opacity-70">Loading...</span>
            </div>
          ) : city ? (
            <div>
              <p className="font-medium leading-tight">{city.name}</p>
              <p className="text-xs opacity-80 leading-tight">{city.region}</p>
            </div>
          ) : (
            <span className="opacity-90">Add Address</span>
          )}
        </div>

        <ChevronDown
          className={`w-4 h-4 opacity-70 flex-shrink-0 transition-transform duration-200 
                      ${openDropdown ? "rotate-180" : ""}`}
        />
      </div>

      {/* Dropdown Menu */}
      {openDropdown && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-gray-900 text-white rounded-lg shadow-2xl border border-white/10 overflow-hidden z-50">
          {/* Current Location Section */}
          {city && (
            <div className="p-4 border-b border-white/10">
              <h3 className="text-xs uppercase tracking-wider opacity-60 mb-2">
                Current Location
              </h3>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm">{city.name}</p>
                  <p className="text-xs opacity-80">{city.region}</p>
                  <p className="text-xs opacity-60">{city.country}</p>
                  <p className="text-xs opacity-40 mt-1">IP: {city.ip}</p>
                </div>
              </div>
            </div>
          )}

          {/* Popular Cities Section */}
          <div className="p-2">
            <h3 className="px-3 py-2 text-xs uppercase tracking-wider opacity-60">
              Popular Cities
            </h3>
            <button
              onClick={() => {
                console.log("Selected: Karachi");
                setOpenDropdown(false);
              }}
              className="w-full text-left px-3 py-2 hover:bg-white/10 rounded transition-colors"
            >
              <p className="font-medium text-sm">Lahore</p>
              <p className="text-xs opacity-60">Punjab, Pakistan</p>
            </button>
          </div>

          {/* Search Location Button */}
          <div className="p-2 border-t border-white/10">
            <button
              onClick={() => {
                console.log("Search for location");
                setOpenDropdown(false);
              }}
              className="w-full px-3 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-medium rounded transition-colors text-sm"
            >
              📍 Search for Location
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LocationPicker;
