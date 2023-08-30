'use client';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { sidebarLinks } from '@/constants';

export const Bottombar = () => {
  const router = useRouter();
  const path = usePathname();
  return (
    <section className="bottombar">
      <div className="bottombar_container">
        {sidebarLinks.map(({ route, label, imgURL }) => {
          const isActive =
            (path.includes(route) && route.length > 1) || path === route;
          return (
            <Link
              className={`bottombar_link ${isActive && 'bg-primary-500'}`}
              href={route}
              key={route}
            >
              <Image src={imgURL} alt={label} width={24} height={24} />
              <p className="text-subtle-medium text-light-1 max-sm:hidden">
                {label.split(/\s+/)[0]}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
