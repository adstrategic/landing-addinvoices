import React from "react";

export const StoreButtons = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
      <a
        href="#"
        className="flex items-center bg-black text-white rounded-lg px-4 py-2 hover:opacity-80 transition-opacity border border-white/10"
        aria-label="Get it on Google Play"
      >
        <svg
          viewBox="0 0 24 24"
          className="w-8 h-8 mr-2"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.60861 2.66315C3.4035 2.88065 3.28516 3.19315 3.28516 3.59065V20.4082C3.28516 20.8057 3.4035 21.1182 3.60861 21.3357L3.69482 21.4199L13.0648 12.0499V11.9316L3.69482 2.56152L3.60861 2.66315Z"
            fill="url(#paint0_linear)"
          />
          <path
            d="M16.166 15.1512L13.0645 12.0496V11.9312L16.166 8.82959L16.2307 8.86193L20.6895 11.3943C21.9607 12.1162 21.9607 13.2904 20.6895 14.0123L16.2307 16.5446L16.166 15.1512Z"
            fill="url(#paint1_linear)"
          />
          <path
            d="M13.0645 11.9313L3.6084 2.4751C3.9532 2.10885 4.52424 2.07651 5.15987 2.43201L13.0645 11.9313Z"
            fill="url(#paint2_linear)"
          />
          <path
            d="M13.0645 12.0498L5.15987 21.5668C4.52424 21.9223 3.9532 21.89 3.6084 21.5237L13.0645 12.0498Z"
            fill="url(#paint3_linear)"
          />
          <defs>
            <linearGradient
              id="paint0_linear"
              x1="12.2372"
              y1="19.9878"
              x2="2.87283"
              y2="3.12344"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#00A0FF" />
              <stop offset="0.00657" stopColor="#00A1FF" />
              <stop offset="0.2601" stopColor="#00BEFF" />
              <stop offset="0.5122" stopColor="#00D2FF" />
              <stop offset="0.7604" stopColor="#00DFFF" />
              <stop offset="1" stopColor="#00E3FF" />
            </linearGradient>
            <linearGradient
              id="paint1_linear"
              x1="22.0681"
              y1="11.9904"
              x2="13.0645"
              y2="11.9904"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FFE000" />
              <stop offset="0.4087" stopColor="#FFBD00" />
              <stop offset="0.7754" stopColor="#FFA500" />
              <stop offset="1" stopColor="#FF9C00" />
            </linearGradient>
            <linearGradient
              id="paint2_linear"
              x1="15.6497"
              y1="4.09115"
              x2="5.9892"
              y2="13.7517"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FF3A44" />
              <stop offset="1" stopColor="#C31162" />
            </linearGradient>
            <linearGradient
              id="paint3_linear"
              x1="4.22323"
              y1="19.4166"
              x2="10.9362"
              y2="12.7036"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#32A071" />
              <stop offset="0.0685" stopColor="#2DA771" />
              <stop offset="0.4762" stopColor="#15CF74" />
              <stop offset="0.8009" stopColor="#06E775" />
              <stop offset="1" stopColor="#00F076" />
            </linearGradient>
          </defs>
        </svg>
        <div className="flex flex-col items-start">
          <span className="text-[10px] uppercase leading-none">GET IT ON</span>
          <span className="text-lg font-semibold leading-none">Google Play</span>
        </div>
      </a>

      <a
        href="#"
        className="flex items-center bg-black text-white rounded-lg px-4 py-2 hover:opacity-80 transition-opacity border border-white/10"
        aria-label="Download on the App Store"
      >
        <svg
          viewBox="0 0 24 24"
          className="w-8 h-8 mr-2"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.6004 15.5156C17.6109 13.626 19.1515 12.5684 19.225 12.5264C18.1961 11.0352 16.6109 10.8042 15.9284 10.7727C14.5847 10.6362 13.2832 11.5707 12.5904 11.5707C11.8871 11.5707 10.7951 10.7832 9.66109 10.8042C8.18109 10.8252 6.82709 11.6652 6.07109 12.9782C4.51709 15.6767 5.68309 19.6882 7.19459 21.8722C7.93959 22.9432 8.83209 24.1402 10.0076 24.0982C11.1416 24.0562 11.5721 23.3842 12.9576 23.3842C14.3321 23.3842 14.7311 24.0982 15.9176 24.0772C17.1566 24.0562 17.9651 22.9537 18.6996 21.8722C19.5501 20.6332 19.9071 19.4257 19.9281 19.3312C19.9071 19.3207 17.5794 18.4282 17.6004 15.5156Z" />
          <path d="M15.3512 8.68359C15.9602 7.93809 16.3697 6.90909 16.2542 5.88009C15.3722 5.92209 14.3012 6.46809 13.6712 7.20309C13.1042 7.85409 12.6107 8.91459 12.7472 9.93309C13.7237 10.0066 14.7422 9.42909 15.3512 8.68359Z" />
        </svg>
        <div className="flex flex-col items-start">
          <span className="text-[10px] uppercase leading-none">Download on the</span>
          <span className="text-lg font-semibold leading-none">App Store</span>
        </div>
      </a>
    </div>
  );
};
