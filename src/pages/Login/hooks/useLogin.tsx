import { login } from '@/api/auth';
import { LoginRequest } from '@/types';
import { useMutation } from '@tanstack/react-query';

export default function useLogin() {
  const mutation = useMutation({
    mutationFn: (data: LoginRequest) => login(data),
  });

  return mutation;
}
