"use client";
import { useState, useEffect } from "react";

const AnimatedLines = () => {
  return (
    <div className="border2 w-full">
      <svg
        width="1238"
        height="195"
        viewBox="0 0 1238 195"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.294492 7.14087C-0.0969131 7.53051 -0.0983434 8.16367 0.291298 8.55508L6.64087 14.9334C7.03051 15.3248 7.66367 15.3262 8.05508 14.9366C8.44648 14.547 8.44791 13.9138 8.05827 13.5224L2.41421 7.85277L8.08383 2.2087C8.47523 1.81906 8.47666 1.1859 8.08702 0.794494C7.69738 0.403089 7.06422 0.401659 6.67281 0.791299L0.294492 7.14087ZM1237.7 8.56773C1238.09 8.18341 1238.1 7.55032 1237.72 7.15369L1231.46 0.690238C1231.07 0.293607 1230.44 0.28363 1230.04 0.667952C1229.64 1.05227 1229.63 1.68536 1230.02 2.08199L1235.59 7.82728L1229.84 13.3943C1229.44 13.7786 1229.43 14.4117 1229.82 14.8083C1230.2 15.205 1230.84 15.2149 1231.23 14.8306L1237.7 8.56773ZM624.883 60.6518L625.69 60.0624L624.883 60.6518ZM590.274 110.219L589.293 110.027L590.274 110.219ZM609.447 64.249L608.62 63.6868L609.447 64.249ZM588.039 138.846L587.04 138.901L588.039 138.846ZM589.883 112.217L590.865 112.409L589.883 112.217ZM589.544 166.245L590.543 166.19L589.544 166.245ZM640.098 184.727L640.826 185.413L640.098 184.727ZM648.491 165.601L647.492 165.547L648.491 165.601ZM640.436 184.369L639.708 183.683L640.436 184.369ZM650.127 135.831L651.126 135.886L650.127 135.831ZM1 7.84957C0.997741 8.84957 0.999676 8.84957 1.00354 8.84958C1.00741 8.84959 1.0132 8.8496 1.02092 8.84962C1.03635 8.84966 1.05948 8.84971 1.09023 8.84978C1.15174 8.84992 1.24377 8.85013 1.36585 8.85041C1.61001 8.85096 1.97439 8.8518 2.45521 8.85291C3.41687 8.85513 4.84434 8.85846 6.70761 8.86287C10.4341 8.87169 15.9038 8.88485 22.8764 8.90221C36.8215 8.93694 56.7783 8.98846 80.8245 9.05567C128.917 9.19008 193.368 9.38722 258.8 9.63812C389.692 10.14 524.441 10.8572 540.117 11.7156L540.227 9.71855C524.484 8.85646 389.647 8.13985 258.808 7.63814C193.374 7.38723 128.923 7.19009 80.8301 7.05568C56.7836 6.98847 36.8267 6.93694 22.8814 6.90222C15.9087 6.88486 10.4389 6.8717 6.71234 6.86287C4.84904 6.85846 3.42153 6.85514 2.45984 6.85292C1.97899 6.8518 1.6146 6.85097 1.37042 6.85041C1.24833 6.85013 1.15629 6.84992 1.09477 6.84978C1.06402 6.84971 1.04089 6.84966 1.02545 6.84963C1.01773 6.84961 1.01193 6.8496 1.00807 6.84959C1.0042 6.84958 1.00226 6.84957 1 7.84957ZM540.117 11.7156C547.799 12.1362 556.473 14.8434 565.207 18.7192C573.929 22.5898 582.649 27.5978 590.408 32.5637C598.165 37.528 604.945 42.4402 609.787 46.1119C612.207 47.9473 614.142 49.4718 615.471 50.5366C616.135 51.069 616.648 51.4864 616.994 51.7701C617.167 51.912 617.298 52.0205 617.386 52.0933C617.43 52.1297 617.462 52.1571 617.484 52.1753C617.495 52.1844 617.503 52.1912 617.509 52.1957C617.511 52.1979 617.513 52.1996 617.515 52.2006C617.515 52.2012 617.516 52.2015 617.516 52.2018C617.516 52.202 617.516 52.202 618.158 51.4353C618.8 50.6687 618.8 50.6684 618.8 50.668C618.799 50.6677 618.799 50.6672 618.798 50.6665C618.796 50.6652 618.794 50.6633 618.791 50.6608C618.785 50.6558 618.776 50.6485 618.765 50.6388C618.742 50.6196 618.707 50.591 618.662 50.5536C618.572 50.4786 618.438 50.3679 618.262 50.2238C617.91 49.9355 617.392 49.5133 616.721 48.976C615.381 47.9014 613.432 46.3657 610.996 44.5183C606.124 40.824 599.299 35.8793 591.486 30.8791C583.676 25.8804 574.863 20.8164 566.018 16.8911C557.184 12.9709 548.255 10.1582 540.227 9.71855L540.117 11.7156ZM649.129 135.776L647.492 165.547L649.489 165.656L651.126 135.886L649.129 135.776ZM639.708 183.683L639.37 184.041L640.826 185.413L641.164 185.055L639.708 183.683ZM590.543 166.19L589.037 138.791L587.04 138.901L588.546 166.3L590.543 166.19ZM618.158 51.4353C618.78 52.2188 618.78 52.2187 618.78 52.2186C618.78 52.2184 618.781 52.2181 618.781 52.2177C618.782 52.217 618.784 52.2157 618.786 52.214C618.79 52.2106 618.797 52.2055 618.805 52.1985C618.823 52.1846 618.85 52.1636 618.885 52.1357C618.956 52.0799 619.063 51.9965 619.203 51.887C619.485 51.6679 619.904 51.3443 620.45 50.928C621.542 50.0956 623.145 48.8927 625.18 47.4146C629.253 44.4581 635.056 40.402 641.978 36.0066C655.836 27.207 674.121 17.0833 691.947 11.674L691.366 9.76015C673.284 15.2472 654.82 25.4827 640.906 34.3182C633.942 38.7402 628.104 42.8206 624.005 45.7962C621.956 47.2842 620.341 48.4963 619.238 49.3373C618.686 49.7578 618.262 50.0855 617.975 50.3086C617.832 50.4201 617.723 50.5055 617.649 50.5632C617.613 50.5921 617.585 50.614 617.566 50.6289C617.557 50.6363 617.549 50.6419 617.545 50.6458C617.542 50.6477 617.54 50.6492 617.539 50.6502C617.538 50.6507 617.538 50.6512 617.538 50.6514C617.537 50.6517 617.537 50.6519 618.158 51.4353ZM691.947 11.674C694.082 11.0259 698.082 10.4251 703.792 9.88473C709.474 9.34707 716.77 8.87555 725.446 8.46425C742.796 7.64173 765.629 7.06171 792.029 6.67197C844.829 5.89252 911.867 5.87455 977.789 6.19714C1043.71 6.51971 1108.51 7.18279 1156.83 7.76523C1180.99 8.05645 1201.03 8.32751 1215.03 8.52576C1222.03 8.62488 1227.52 8.70581 1231.26 8.76195C1233.12 8.79002 1234.56 8.8119 1235.52 8.82675C1236 8.83418 1236.37 8.83985 1236.61 8.84367C1236.74 8.84558 1236.83 8.84702 1236.89 8.84799C1236.92 8.84847 1236.95 8.84884 1236.96 8.84908C1236.97 8.8492 1236.97 8.84929 1236.98 8.84936C1236.98 8.84942 1236.98 8.84945 1237 7.84957C1237.02 6.84969 1237.01 6.84966 1237.01 6.8496C1237.01 6.84954 1237 6.84945 1236.99 6.84933C1236.98 6.84908 1236.95 6.84872 1236.92 6.84824C1236.86 6.84727 1236.77 6.84582 1236.65 6.84391C1236.4 6.8401 1236.04 6.83442 1235.55 6.82699C1234.59 6.81213 1233.16 6.79025 1231.29 6.76217C1227.54 6.70603 1222.05 6.62509 1215.05 6.52596C1201.05 6.32769 1181.01 6.05661 1156.85 5.76538C1108.53 5.1829 1043.73 4.51977 977.798 4.19716C911.873 3.87456 844.819 3.89244 792 4.67218C765.591 5.06204 742.734 5.64245 725.351 6.46649C716.661 6.87848 709.33 7.35177 703.604 7.89362C697.907 8.43277 693.719 9.04619 691.366 9.76015L691.947 11.674ZM590.865 112.409L591.255 110.411L589.293 110.027L588.902 112.025L590.865 112.409ZM610.274 64.8112L618.985 51.9976L617.331 50.8731L608.62 63.6868L610.274 64.8112ZM617.351 52.0247L624.075 61.2412L625.69 60.0624L618.966 50.846L617.351 52.0247ZM624.075 61.2412C635.819 77.3387 643.889 95.8168 647.715 115.372L649.678 114.988C645.796 95.1456 637.607 76.3963 625.69 60.0624L624.075 61.2412ZM591.255 110.411C594.45 94.0828 600.92 78.5708 610.274 64.8112L608.62 63.6868C599.114 77.6697 592.539 93.4336 589.293 110.027L591.255 110.411ZM589.037 138.791C588.551 129.955 589.165 121.093 590.865 112.409L588.902 112.025C587.171 120.872 586.545 129.9 587.04 138.901L589.037 138.791ZM597.65 183.436C593.399 178.656 590.894 172.577 590.543 166.19L588.546 166.3C588.922 173.138 591.604 179.647 596.156 184.765L597.65 183.436ZM639.37 184.041C627.981 196.123 608.684 195.843 597.65 183.436L596.156 184.765C607.97 198.049 628.631 198.349 640.826 185.413L639.37 184.041ZM647.492 165.547C647.12 172.321 644.363 178.746 639.708 183.683L641.164 185.055C646.142 179.774 649.091 172.903 649.489 165.656L647.492 165.547ZM651.126 135.886C651.51 128.887 651.024 121.867 649.678 114.988L647.715 115.372C649.029 122.089 649.504 128.942 649.129 135.776L651.126 135.886Z"
          fill="#4F0A19"
        />
      </svg>
    </div>
  );
};

export default AnimatedLines;
