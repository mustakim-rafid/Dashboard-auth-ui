"use client";

import { loginUser } from "@/actions/auth/login";
import InputFieldError from "@/components/shared/InputFieldError";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

const LoginForm = () => {
  const [state, formAction, pending] = useActionState(loginUser, null);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  useEffect(() => {
    if (state && state.error) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <form action={formAction}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            defaultValue={state?.formData?.email || ""}
          />
          <InputFieldError field="email" state={state} />
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="******"
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
            >
              {showPassword ? <EyeIcon size={18} /> : <EyeOffIcon size={18} />}
            </button>
          </div>
          <InputFieldError field="password" state={state} />
        </Field>
        <Field>
          <Button type="submit" disabled={pending} className="cursor-pointer">
            {pending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Login"}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
};

export default LoginForm;
