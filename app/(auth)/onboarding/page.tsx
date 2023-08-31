import { AccountProfileForm } from '@/components/forms';
import { currentUser } from '@clerk/nextjs';

const Page = async () => {
  const user = await currentUser();
  const userInfo = {} as any;
  const userData = {
    id: user?.id,
    objectId: userInfo?._id,
    usename: userInfo?.username || user?.username,
    name: userInfo?.name || user?.firstName || '',
    bio: userInfo?.bio || '',
    image: userInfo?.image || user?.imageUrl
  };
  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
      <h1 className="head-text">Onboarding</h1>
      <p className="mt-3 text-base-regular text-light-2">
        Completa tu perfil para empezar en threads.
      </p>
      <section className="mt-9 bg-dark-2 p-10 rounded-md">
        <AccountProfileForm user={userData} btnTitle="Continuar" />
      </section>
    </main>
  );
};

export default Page;
