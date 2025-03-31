import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import axiosInstance from "@/lib/axios-instance";
import { useToast } from "@/components/ui/use-toast";
import { signIn } from "next-auth/react";
import { waitForThreeSeconds } from "@/lib/helpers";

export const usePostVerifyToken = () => {
  const [response, setResponse] = useState("");
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      return axiosInstance.post(`/auth/verify-token`, data);
    },
    onError: (error: any) => {
      console.log("Verification error:", error.response.data);
      setResponse(error.response.data.message);
      toast({
        variant: "destructive",
        title: "An error occured",
        description: error.response.data.message,
      });
    },
    onSuccess: async (response: any) => {
      console.log("Verification success:", response.data);

      await signIn("credentials", {
        redirect: false,
        email: response.data.email,
        password: response.data.password,
      });

      toast({
        variant: "success",
        title: "Successful",
        description: "Welcome to Lassod Learning",
      });

      await waitForThreeSeconds();

      window.location.href = "/dashboard";
    },
  });

  return { mutation, response };
};

export const usePostGenerateToken = () => {
  const [response, setResponse] = useState("");
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: (data: any) => {
      return axiosInstance.post("/auth/generate-reset-token", data);
    },
    onError: (error: any) => {
      setResponse(error?.response?.data?.message || "Error generating OTP");
    },
    onSuccess: (response) => {
      toast({
        variant: "success",
        title: "Successful",
        description: response.data.message,
      });
    },
  });

  return { mutation, response, setResponse };
};

export const useLogin = () => {
  const [response, setResponse] = useState("");
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: (data: any) => {
      console.log(data);
      return axiosInstance.post(`/auth/login`, data);
    },
    onError: async (error: any) => {
      console.log(error.response);
      setResponse(error.response.data.message);
    },
    onSuccess: async (response: any) => {
      await signIn("credentials", {
        redirect: false,
        email: response.data.email,
        password: response.data.password,
      });

      toast({
        variant: "success",
        title: "Successful",
        description: "Welcome to Lassod Learning",
      });

      window.location.href = "/dashboard";
    },
  });

  return { mutation, response, setResponse };
};
