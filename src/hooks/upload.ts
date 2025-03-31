import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios-instance";
import { useToast } from "@/components/ui/use-toast";
import useAxiosAuth from "@/lib/useAxiosAuth";

export function useGetUpload(fileName: string) {
  const queryClient = useQueryClient();
  const queryKey = `/upload/${fileName}`;
  const axiosAuth = useAxiosAuth();

  return useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const previousData = queryClient.getQueryData([queryKey]);
      if (previousData) return previousData;

      try {
        const res = await axiosAuth.get(`/upload/${fileName}`);
        return res?.data?.signedUrl; // Return only the signed URL
      } catch (error) {
        console.error("Error fetching signed URL:", error);
        throw error; // Let it retry based on retry settings
      }
    },
    retry: 3, // Retry fetching if failed (e.g., due to expiration)
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
}

export const useDeleteUpload = () => {
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: (data: any) => {
      console.log(data);
      return axiosInstance.delete(`/upload`, { data });
    },
    onError: (error: any) => {
      console.log(error.response.data);
      toast({
        variant: "destructive",
        title: "An error occured.",
        description: error.response.data.error,
      });
    },
    onSuccess: async (response) => {
      console.log("success", response);
      toast({
        variant: "success",
        title: "Successful",
        description: "File as been deleted",
      });
    },
  });

  return { mutation };
};

export const usePostUpload = () => {
  const [response, setResponse] = useState<any>({});
  const [progress, setProgress] = useState(0); // Track progress
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: (data: any) => {
      return axiosInstance.post("/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 120000000 * 10000000,
        onUploadProgress: (progressEvent: any) => {
          const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(percentage); // Update progress
        },
      });
    },
    onError: (error: any) => {
      console.log(error.response);
      toast({
        variant: "destructive",
        title: "An error occured.",
        description: "Could not upload Profile Picture",
      });
      setResponse(error?.response?.data?.message);
    },
  });

  // Reset progress when file is uploaded or mutation is reset
  useEffect(() => {
    if (mutation.isSuccess) {
      setProgress(0); // Reset progress after upload
    }
  }, [mutation.isSuccess]);

  return { mutation, response, progress };
};
