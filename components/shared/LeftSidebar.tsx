'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { SignOutButton, SignedIn } from '@clerk/nextjs';
import { sidebarLinks } from '@/constants';

export const LeftSidebar = () => {
  const router = useRouter();
  const path = usePathname();
  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="flex flex-1 flex-col gap-6 px-6 w-full">
        {sidebarLinks.map(({ route, label, imgURL }) => {
          const isActive =
            (path.includes(route) && route.length > 1) || path === route;
          return (
            <Link
              className={`leftsidebar_link ${isActive && 'bg-primary-500'}`}
              href={route}
              key={route}
            >
              <Image src={imgURL} alt={label} width={24} height={24} />
              <p className="text-light-1 max-lg:hidden">{label}</p>
            </Link>
          );
        })}
      </div>
      <div className="mt-10 px-6">
        <SignedIn>
          <SignOutButton signOutCallback={() => router.push('/sign-in')}>
            <div className="flex cursor-pointer gap-4 p-4 hover:border-t-2 hover:ring-1 hover:ring-gray-500 rounded-md">
              <Image
                src="/assets/logout.svg"
                alt="logout"
                width={24}
                height={24}
              />
              <p className="text-light-2 max-lg:hidden">Cerrar sesión</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  );
};
