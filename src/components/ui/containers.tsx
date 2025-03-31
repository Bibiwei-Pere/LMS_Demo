"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { shortenText } from "@/lib/helpers";

const Container = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ id, className, ...props }, ref) => (
    <div
      ref={ref}
      id={id}
      className={cn("flex flex-col gap-14 lg:px-8 xl:px-24 px-4 py-16 max-w-screen-xl mx-auto", className)}
      {...props}
    />
  )
);
Container.displayName = "Container";

const ContainerAuth = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "bg-cover min-h-screen bg-testimonial_bg bg-no-repeat flex items-center justify-center py-20 lg:py-24 px-4 lg:px-8 xl:px-24 max-w-screen-2xl mx-auto",
        className
      )}
      {...props}
    />
  )
);
ContainerAuth.displayName = "ContainerAuth";

const ContainerDashboard = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("px-4 md:px-8 py-3", className)} {...props} />
);
ContainerDashboard.displayName = "ContainerDashboard";

interface DashboardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  hidden?: boolean;
  data?: any;
  setData?: any;
}

const DashboardHeader = React.forwardRef<HTMLDivElement, DashboardHeaderProps>(
  ({ title, hidden, className, children, data, setData, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex bg-white gap-6 sticky pt-9 pb-4 pr-4 md:pr-7 pl-4 md:pl-7 z-40 top-0 items-start justify-between",
        className
      )}
      {...props} // Spread remaining props to the div
    >
      <div className='flex gap-4 items-center'>
        <h2 className='hidden font-bold md:block max-w-[700px]'>{children ? shortenText(title || "", 30) : title}</h2>
        <span className='hidden font-bold md:block'>{children && children}</span>
      </div>
    </div>
  )
);

DashboardHeader.displayName = "DashboardHeader";

const NavigateBack = ({ children }: { children: React.ReactNode }) => {
  const navigation = useRouter();
  return (
    <div onClick={() => navigation.back()} className={cn("cursor-pointer flex items-center gap-3")}>
      {children}
    </div>
  );
};

NavigateBack.displayName = "NavigateBack";

export { Container, ContainerAuth, ContainerDashboard, DashboardHeader, NavigateBack };
