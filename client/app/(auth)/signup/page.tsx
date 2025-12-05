"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FloatingInput, PasswordInput } from "@/components/forms";
import { register as registerUser } from "@/API/auth.api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { registerSchema } from "@/validations/auth.validation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const SignupPage = () => {
  const router = useRouter();

  const { mutateAsync } = useMutation({
    mutationFn: registerUser,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof registerSchema>> = async (
    data
  ) => {
    const { response, success } = await mutateAsync(data);
    if (success) {
      toast.success("Signup successfull");
      router.push("/login");
    } else return toast.error(response as string);
  };

  return (
    <Card className="mx-auto max-w-sm w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Signup</CardTitle>
        <CardDescription>
          Enter the details to signup for the platform
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <FloatingInput
            placeholder="Full Name"
            type="text"
            name="name"
            register={register}
            isError={errors.name || false}
            errorMessage={errors.name?.message}
          />
          <FloatingInput
            placeholder="Email Address"
            type="email"
            name="email"
            register={register}
            isError={errors.email || false}
            errorMessage={errors.email?.message}
          />
          <PasswordInput
            placeholder="Password"
            type="password"
            name="password"
            register={register}
            isError={errors.password || false}
            errorMessage={errors.password?.message}
          />

          <Button
            disabled={isSubmitting}
            type="submit"
            className="w-full bg-bg dark:bg-white"
          >
            Signup
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignupPage;
