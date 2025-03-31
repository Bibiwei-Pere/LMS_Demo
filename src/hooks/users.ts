import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import axiosInstance, { useAxiosInstance } from "@/lib/axios-instance";
import { useEffect } from "react";
import useAxiosAuth from "@/lib/useAxiosAuth";
import axios from "axios";

export function useGetAllUser() {
  const queryClient = useQueryClient();
  const queryKey = `/users`;
  const axiosAuth = useAxiosAuth();
  return useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const previousData = queryClient.getQueryData([queryKey]);
      if (previousData) return previousData;

      const res = await axiosAuth.get(`/users`);
      console.log(res);
      return res?.data;
    },
    retry: 3,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
}

// async function getWordPressCourseId(courseTitle) {
//   try {
//     const response = await axios.get("https://your-wordpress-site.com/wp-json/wp/v2/courses");
//     const courses = response.data;

//     const course = courses.find((c) => c.title.rendered === courseTitle);
//     return course ? course.id : null;
//   } catch (error) {
//     console.error("Failed to fetch course IDs:", error);
//     return null;
//   }
// }

export function useGetCourses() {
  const queryClient = useQueryClient();
  const queryKey = `/courses`;
  return useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const previousData = queryClient.getQueryData([queryKey]);
      if (previousData) return previousData;

      const res = await axios.get("https://learning.lassod.com/wp-json/wp/v2/courses");
      console.log(res);
      console.log(res?.data);
      return res?.data;
    },
    retry: 3,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
}

export function useGetUser() {
  const queryClient = useQueryClient();
  const session = useSession();
  const userId = session?.data?.user?.id;
  const queryKey = `/users/profile/${userId}`;
  const axiosAuth = useAxiosAuth();
  return useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const previousData = queryClient.getQueryData([queryKey]);
      if (previousData) return previousData;

      const res = await axiosAuth.get(`/users/profile/${userId}`);
      console.log(res);
      return res?.data;
    },
    enabled: !!userId,
    retry: 3,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
}

export function useGetUserById(userId: string) {
  const queryClient = useQueryClient();
  const queryKey = `/users/${userId}`;
  const axiosAuth = useAxiosAuth();
  return useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const previousData = queryClient.getQueryData([queryKey]);
      if (previousData) return previousData;

      const res = await axiosAuth.get(`/users/${userId}`);
      console.log(res);
      return res?.data;
    },
    enabled: !!userId,
    retry: 3,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
}

export const useUpdateUser = () => {
  const { toast } = useToast();

  const { data: session } = useSession();

  useEffect(() => {
    if (session?.accessToken) useAxiosInstance(session.accessToken);
  }, [session?.accessToken]);

  const mutation = useMutation({
    mutationFn: (data: any) => {
      console.log(data);
      return axiosInstance.patch("/users", data);
    },
    onError: (error: any) => {
      console.log(error.response.data);
      toast({
        variant: "destructive",
        title: "An error occured.",
        description: error.response.data.message,
      });
    },
  });

  return { mutation };
};

export const useEnrollUser = () => {
  const { toast } = useToast();

  const { data: session } = useSession();

  useEffect(() => {
    if (session?.accessToken) useAxiosInstance(session.accessToken);
  }, [session?.accessToken]);

  const mutation = useMutation({
    mutationFn: (data: any) => {
      console.log(data);
      return axiosInstance.post("/users/enroll", data);
    },
    onError: (error: any) => {
      console.log(error.response.data);
      toast({
        variant: "destructive",
        title: "An error occured.",
        description: error.response.data.message,
      });
    },
    onSuccess: (response: any) => {
      console.log(response.data);
    },
  });

  return { mutation };
};

export const useDeleteUser = () => {
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: (data: any) => {
      console.log(data);
      return axiosInstance.delete(`/users/${data?.userId}`);
    },
    onError: (error: any) => {
      console.log(error.response.data.message);
      toast({
        variant: "destructive",
        title: "An error occured.",
        description: error.response.data.message,
      });
    },
    onSuccess: async (response) => {
      console.log("success", response);
      toast({
        variant: "success",
        title: "Successful",
        description: "User as been deleted",
      });
      // await waitForThreeSeconds();
      // window.location.reload();
    },
  });

  return { mutation };
};
