import { ChangeEvent, FC, useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserValidation, format, useUploadThing } from '@/lib';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Button,
  Textarea
} from '@/shadcnComponents';

interface Props {
  user: {
    id: string | undefined;
    objectId: string;
    usename: string;
    name: string;
    bio: string;
    image: string;
  };
  btnTitle: string;
}
export const AccountProfileForm: FC<Props> = ({ user, btnTitle }) => {
  const [files, setFiles] = useState<File[]>([]);

  const { startUpload } = useUploadThing('media');

  const form = useForm({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      profile_photo: user?.image || '',
      name: user?.name || '',
      username: user?.usename || '',
      bio: user?.bio || ''
    }
  });

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();
    const fileReader = new FileReader();

    if (e.target.files && e.target.files?.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));
      if (!file.type.includes('image')) return;
      fileReader.onload = async (event) => {
        const imgDataUrl = event.target?.result?.toString() || '';
        fieldChange(imgDataUrl);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const onSubmit = async (values: z.infer<typeof UserValidation>) => {
    const blob = values.profile_photo;

    // Cambios en la imgen
    const imageChange = format.isBase64Image(blob);

    if (imageChange) {
      const imgRes = await startUpload(files);

      if (imgRes?.[0].url) {
        values.profile_photo = imgRes[0].url;
      }
    }

    // Todo: actualizar usuario
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col justify-start gap-10"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {/* Imagen */}
        <FormField
          control={form.control}
          name="profile_photo"
          render={({ field }) => (
            <FormItem className="flex items-center gap-4">
              <FormLabel className="account-form_image-label">
                {field.value ? (
                  <Image
                    src={field.value}
                    alt="profile photo"
                    width={96}
                    height={96}
                    priority
                    className="rounded-full object-contain"
                  />
                ) : (
                  <Image
                    src="/assets/profile.svg"
                    alt="profile photo"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                )}
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200">
                <Input
                  type="file"
                  accept="image/png, image/gif, image/jpeg, image/webp, image/jpg"
                  placeholder="Subir foto"
                  className="account-form_input"
                  onChange={(e) => handleImage(e, field.onChange)}
                />
              </FormControl>
            </FormItem>
          )}
        />
        {/* Nombre */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex gap-3 flex-col w-full">
              <FormLabel className="text-base-semibold text-light-2">
                Nombre
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Nombre"
                  className="account-form_input no-focus"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        {/* User name */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex gap-3 flex-col w-full">
              <FormLabel className="text-base-semibold text-light-2">
                Usuario
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="userName"
                  className="account-form_input no-focus"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        {/* Bio */}
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3 w-full">
              <FormLabel className="text-base-semibold text-light-2">
                Biografia
              </FormLabel>
              <FormControl>
                <Textarea
                  rows={10}
                  placeholder="Biografia"
                  className="account-form_input no-focus"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className="bg-primary-500 text-light-2" type="submit">
          {btnTitle}
        </Button>
      </form>
    </Form>
  );
};
