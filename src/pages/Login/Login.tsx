import { zodResolver } from '@hookform/resolvers/zod';
import { UseFormReturn, useForm } from 'react-hook-form';
import * as z from 'zod';

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

const formSchema = z.object({
  username: z.string(),
  password: z.string(),
});

interface LoginFormProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

function LoginForm({ form }: LoginFormProps) {
  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name='username'
        render={({ field }) => (
          <FormItem>
            <FormLabel className='font-extralight'>Usuario</FormLabel>
            <FormControl>
              <Input data-testid='username' type='text' placeholder='martinpsalvado' {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name='password'
        render={({ field }) => (
          <FormItem>
            <FormLabel className='font-extralight'>Password</FormLabel>
            <FormControl>
              <Input data-testid='password' type='password' placeholder='********' {...field} />
            </FormControl>
          </FormItem>
        )}
      />
    </Form>
  );
}

export default function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log('Values', values);
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
          <LoginForm form={form} />
        </CardContent>
        <CardFooter className='w-full'>
          <Button className='w-full bg-[#6317C3]' onClick={form.handleSubmit(onSubmit)}>
            Iniciar Sesion
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}
