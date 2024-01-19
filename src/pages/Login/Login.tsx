import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import { UseFormReturn, useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from 'react-toastify';
import clsx from 'clsx';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useLogin } from './hooks';

const formSchema = z.object({
  username: z.string(),
  password: z.string(),
});

type FormSchema = z.infer<typeof formSchema>;

interface LoginFormProps {
  form: UseFormReturn<FormSchema>;
  hasError: boolean;
}

function LoginForm({ form, hasError }: LoginFormProps) {
  const inputClassName = clsx({ 'border-red-500 text-red-500': hasError });
  const labelClassName = clsx('font-extralight', { 'text-red-500 font-extralight': hasError });

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name='username'
        render={({ field }) => (
          <FormItem>
            <FormLabel className={labelClassName}>Usuario</FormLabel>
            <FormControl>
              <Input
                className={inputClassName}
                data-testid='username'
                type='text'
                placeholder='martinpsalvado'
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name='password'
        render={({ field }) => (
          <FormItem>
            <FormLabel className={labelClassName}>Password</FormLabel>
            <FormControl>
              <Input
                className={inputClassName}
                data-testid='password'
                type='password'
                placeholder='********'
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </Form>
  );
}

export default function Login() {
  const navigate = useNavigate();
  const { mutate: login, isError, isPending } = useLogin();

  const form = useForm<FormSchema>({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: zodResolver(formSchema),
  });

  const errorHandler = (error: any) => {
    console.log('HERE', error);
    if (error.response.status === 404) {
      toast.error('El usuario no existe');
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    login(values, {
      onSuccess: () => navigate('/dashboard'),
      onError: (error) => errorHandler(error),
    });
  };

  return (
    <section className='h-full flex justify-center items-center'>
      <Card className='w-1/2 flex flex-col items-center'>
        <CardHeader className='flex flex-col items-center space-y-1'>
          <CardTitle className='text-2xl'>Inicia Sesion</CardTitle>
          <CardDescription className='font-extralight'>
            Ingrese su usuario y contrasena
          </CardDescription>
        </CardHeader>
        <CardContent className='grid gap-4 w-full'>
          <LoginForm form={form} hasError={isError} />
        </CardContent>
        <CardFooter className='w-full'>
          <Button
            className='w-full bg-[#6317C3]'
            data-testid='login-button'
            disabled={isPending}
            onClick={form.handleSubmit(onSubmit)}
          >
            {isPending && (
              <ReloadIcon className='mr-2 h-4 w-4 animate-spin' data-testid='loading-indicator' />
            )}
            {isPending ? 'Iniciando Sesion' : 'Iniciar Sesion'}
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}
