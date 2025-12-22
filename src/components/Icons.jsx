// Classic Mac OS Icons as SVG components

// Classic Mac folder - manila/beige color with tab on right side
export const FolderIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Main folder body */}
    <path d="M2 10H30V28H2V10Z" fill="#E8DCC8" stroke="#000" strokeWidth="1"/>
    {/* Folder tab on right */}
    <path d="M18 6H28V10H18V6Z" fill="#E8DCC8" stroke="#000" strokeWidth="1"/>
    {/* Top edge highlight */}
    <path d="M3 11H29V12H3V11Z" fill="#F5EDE0"/>
    {/* Bottom shadow */}
    <path d="M3 26H29V27H3V26Z" fill="#C4B8A8"/>
    {/* Left edge highlight */}
    <path d="M3 11V27" stroke="#F5EDE0" strokeWidth="1"/>
    {/* Right edge shadow */}
    <path d="M29 11V27" stroke="#C4B8A8" strokeWidth="1"/>
  </svg>
);

export const DocumentIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 2H20L26 8V30H6V2Z" fill="#FFF" stroke="#000" strokeWidth="1"/>
    <path d="M20 2V8H26" fill="#EEE" stroke="#000" strokeWidth="1"/>
    <rect x="9" y="12" width="14" height="1" fill="#000"/>
    <rect x="9" y="15" width="14" height="1" fill="#000"/>
    <rect x="9" y="18" width="10" height="1" fill="#000"/>
    <rect x="9" y="21" width="12" height="1" fill="#000"/>
    <rect x="9" y="24" width="8" height="1" fill="#000"/>
  </svg>
);

export const PictureIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="4" width="28" height="24" fill="#FFF" stroke="#000" strokeWidth="1"/>
    <rect x="4" y="6" width="24" height="20" fill="#87CEEB" stroke="#000" strokeWidth="1"/>
    <circle cx="10" cy="12" r="3" fill="#FFD700"/>
    <path d="M4 22L12 16L18 20L24 14L28 18V26H4V22Z" fill="#228B22"/>
  </svg>
);

export const HardDriveIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Main body */}
    <rect x="2" y="8" width="28" height="18" rx="2" fill="#E8E8E8" stroke="#000" strokeWidth="1"/>
    {/* Screen/display area */}
    <rect x="4" y="10" width="24" height="10" fill="#C0C0C0" stroke="#000" strokeWidth="1"/>
    {/* Floppy slot */}
    <rect x="6" y="12" width="14" height="2" fill="#333"/>
    {/* LED light */}
    <rect x="24" y="22" width="4" height="2" fill="#333"/>
    {/* Bottom bezel highlight */}
    <path d="M4 21H28V22H4V21Z" fill="#FFF"/>
  </svg>
);

export const TrashIcon = ({ empty = true }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Trash can body */}
    <path d="M7 10H25V28C25 29 24 30 23 30H9C8 30 7 29 7 28V10Z" fill={empty ? "#FFF" : "#DDD"} stroke="#000" strokeWidth="1"/>
    {/* Lid */}
    <path d="M5 7H27V10H5V7Z" fill="#E8E8E8" stroke="#000" strokeWidth="1"/>
    {/* Handle */}
    <path d="M12 4H20V7H12V4Z" fill="#E8E8E8" stroke="#000" strokeWidth="1"/>
    {/* Ridges on can */}
    <line x1="11" y1="13" x2="11" y2="26" stroke="#999" strokeWidth="1"/>
    <line x1="16" y1="13" x2="16" y2="26" stroke="#999" strokeWidth="1"/>
    <line x1="21" y1="13" x2="21" y2="26" stroke="#999" strokeWidth="1"/>
  </svg>
);

export const AliasIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 2H20L26 8V30H6V2Z" fill="#FFF" stroke="#000" strokeWidth="1"/>
    <path d="M20 2V8H26" fill="#EEE" stroke="#000" strokeWidth="1"/>
    <path d="M10 20L18 12" stroke="#000" strokeWidth="2"/>
    <path d="M18 12L18 16L14 12L18 12Z" fill="#000"/>
    {/* Curved alias arrow at bottom right */}
    <path d="M22 26C22 23 24 21 27 21" stroke="#000" strokeWidth="1.5" fill="none"/>
    <path d="M25 19L27 21L25 23" stroke="#000" strokeWidth="1.5" fill="none"/>
  </svg>
);

export const GameIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="8" width="24" height="16" rx="4" fill="#666" stroke="#000" strokeWidth="1"/>
    <circle cx="10" cy="16" r="4" fill="#333" stroke="#000"/>
    <rect x="8" y="15" width="4" height="2" fill="#999"/>
    <rect x="9" y="14" width="2" height="4" fill="#999"/>
    <circle cx="20" cy="14" r="2" fill="#F00"/>
    <circle cx="24" cy="16" r="2" fill="#00F"/>
    <circle cx="20" cy="18" r="2" fill="#0F0"/>
  </svg>
);

export const SubscribeIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="8" width="24" height="16" fill="#FFF" stroke="#000" strokeWidth="1"/>
    <path d="M4 8L16 18L28 8" stroke="#000" strokeWidth="1"/>
    <path d="M4 24L12 16" stroke="#000" strokeWidth="1"/>
    <path d="M28 24L20 16" stroke="#000" strokeWidth="1"/>
  </svg>
);

export const MinesweeperIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Grid background */}
    <rect x="4" y="4" width="24" height="24" fill="#C0C0C0" stroke="#000" strokeWidth="1"/>
    {/* Grid lines */}
    <line x1="12" y1="4" x2="12" y2="28" stroke="#808080" strokeWidth="1"/>
    <line x1="20" y1="4" x2="20" y2="28" stroke="#808080" strokeWidth="1"/>
    <line x1="4" y1="12" x2="28" y2="12" stroke="#808080" strokeWidth="1"/>
    <line x1="4" y1="20" x2="28" y2="20" stroke="#808080" strokeWidth="1"/>
    {/* Mine */}
    <circle cx="16" cy="16" r="5" fill="#000"/>
    <line x1="16" y1="9" x2="16" y2="11" stroke="#000" strokeWidth="2"/>
    <line x1="16" y1="21" x2="16" y2="23" stroke="#000" strokeWidth="2"/>
    <line x1="9" y1="16" x2="11" y2="16" stroke="#000" strokeWidth="2"/>
    <line x1="21" y1="16" x2="23" y2="16" stroke="#000" strokeWidth="2"/>
    {/* Flag in corner */}
    <rect x="21" y="5" width="1" height="6" fill="#000"/>
    <path d="M22 5L27 7.5L22 10Z" fill="#F00"/>
  </svg>
);

// Mail/Contact icon - classic Mac mail app style
export const MailIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Envelope body */}
    <rect x="3" y="7" width="26" height="18" fill="#FFF" stroke="#000" strokeWidth="1"/>
    {/* Envelope flap */}
    <path d="M3 7L16 17L29 7" stroke="#000" strokeWidth="1" fill="#E8E8E8"/>
    {/* Inner fold lines */}
    <path d="M3 25L13 15" stroke="#999" strokeWidth="1"/>
    <path d="M29 25L19 15" stroke="#999" strokeWidth="1"/>
    {/* Stamp */}
    <rect x="22" y="9" width="5" height="6" fill="#E8DCC8" stroke="#000" strokeWidth="0.5"/>
    <rect x="23" y="10" width="3" height="4" fill="#87CEEB"/>
  </svg>
);

// HyperCard Stack icon - classic stack of cards
export const HyperCardIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Bottom cards (stack effect) */}
    <rect x="6" y="8" width="22" height="18" fill="#E8E8E8" stroke="#000" strokeWidth="1"/>
    <rect x="4" y="6" width="22" height="18" fill="#F0F0F0" stroke="#000" strokeWidth="1"/>
    {/* Top card */}
    <rect x="2" y="4" width="22" height="18" fill="#FFF" stroke="#000" strokeWidth="1"/>
    {/* Card content - title bar */}
    <rect x="4" y="6" width="18" height="4" fill="#000"/>
    <text x="13" y="9.5" fontSize="3" fill="#FFF" textAnchor="middle" fontFamily="Chicago, sans-serif">Home</text>
    {/* Card content lines */}
    <rect x="4" y="12" width="14" height="1" fill="#999"/>
    <rect x="4" y="15" width="12" height="1" fill="#999"/>
    <rect x="4" y="18" width="10" height="1" fill="#999"/>
  </svg>
);

// Rainbow Apple logo - the iconic 6-color Apple
export const AppleLogo = () => (
  <svg width="14" height="17" viewBox="0 0 14 17" xmlns="http://www.w3.org/2000/svg">
    {/* Apple shape with rainbow stripes */}
    <defs>
      <clipPath id="appleClip">
        <path d="M7 3.5C7 3.5 8 0 10.5 0C10.5 0 10 2 7 3.5ZM11.5 4C13.5 4 14 6 14 7.5C14 9 13.5 11 12.5 13C11.5 15 10 17 7 17C4 17 2.5 15 1.5 13C0.5 11 0 9 0 7.5C0 6 0.5 4 2.5 4C4 4 5.5 5 7 5C8.5 5 10 4 11.5 4Z"/>
      </clipPath>
    </defs>
    <g clipPath="url(#appleClip)">
      <rect y="0" width="14" height="2.83" fill="#61BB46"/>
      <rect y="2.83" width="14" height="2.83" fill="#FDB827"/>
      <rect y="5.66" width="14" height="2.83" fill="#F5821F"/>
      <rect y="8.49" width="14" height="2.83" fill="#E03A3E"/>
      <rect y="11.32" width="14" height="2.83" fill="#963D97"/>
      <rect y="14.15" width="14" height="2.85" fill="#009DDC"/>
    </g>
  </svg>
);
