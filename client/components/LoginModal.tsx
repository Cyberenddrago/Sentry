import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Shield, Users, KeyRound } from "lucide-react";

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LoginModal({ open, onOpenChange }: LoginModalProps) {
  const { login, isLoading, error } = useAuth();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(credentials);
  };

  const demoCredentials = [
    {
      role: "Admin",
      username: "vinesh",
      password: "vinesh123",
      description: "Full system access",
      icon: Shield,
      location: "Johannesburg",
    },
    {
      role: "Supervisor",
      username: "sune",
      password: "sune123",
      description: "Supervisor (Apollos)",
      icon: Shield,
      location: "Cape Town",
    },
    {
      role: "Supervisor",
      username: "frans",
      password: "frans123",
      description: "Supervisor (Apollos)",
      icon: Shield,
      location: "Johannesburg",
    },
    {
      role: "Staff",
      username: "lebo",
      password: "lebo123",
      description: "Johannesburg Team",
      icon: Users,
      location: "Johannesburg",
    },
    {
      role: "Staff",
      username: "freedom",
      password: "freedom123",
      description: "Johannesburg Team",
      icon: Users,
      location: "Johannesburg",
    },
    {
      role: "Staff",
      username: "keenan",
      password: "keenan123",
      description: "Cape Town Team",
      icon: Users,
      location: "Cape Town",
    },
    {
      role: "Staff",
      username: "zaundre",
      password: "zaundre123",
      description: "Cape Town Team",
      icon: Users,
      location: "Cape Town",
    },
  ];

  const handleDemoLogin = (username: string, password: string) => {
    setCredentials({ username, password });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-md sm:w-full mx-4 sm:mx-auto">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-2 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-blue-100 flex items-center justify-center">
            <KeyRound className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
          </div>
          <DialogTitle className="text-lg sm:text-xl font-semibold">
            Welcome to JobFlow
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            Please log in to access your dashboard
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              value={credentials.username}
              onChange={(e) =>
                setCredentials({ ...credentials, username: e.target.value })
              }
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              placeholder="Enter your password"
              required
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Demo Accounts
              </span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 sm:grid-cols-2 gap-2 max-h-64 overflow-y-auto">
            {demoCredentials.map((demo, index) => {
              const Icon = demo.icon;
              return (
                <Card
                  key={index}
                  className="cursor-pointer transition-colors hover:bg-muted/50 flex-shrink-0"
                  onClick={() => handleDemoLogin(demo.username, demo.password)}
                >
                  <CardContent className="p-2 sm:p-3">
                    <div className="text-center space-y-1 sm:space-y-2">
                      <div className="mx-auto rounded-full bg-primary/10 p-1 sm:p-2 w-fit">
                        <Icon className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium text-xs sm:text-sm">
                          {demo.username}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {demo.role}
                        </div>
                        <div className="text-xs text-blue-600">
                          {demo.location}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* BlockBusters Footer */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex flex-col items-center justify-center space-y-1 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <span className="font-semibold text-red-600">BlockBusters</span>
              <span>&</span>
              <span className="font-semibold text-yellow-600">Partners</span>
              <span>(PTY) Ltd.</span>
              <span className="text-xs">™</span>
            </div>
            <div className="text-center">
              <span>Use with prejudice</span>
              <span className="mx-2">|</span>
              <span>Contact support for assistance</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
