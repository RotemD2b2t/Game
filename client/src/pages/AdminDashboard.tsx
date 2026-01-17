import { useQuery, useMutation } from "@tanstack/react-query";
import { User } from "@shared/schema";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function AdminDashboard() {
  const [search, setSearch] = useState("");
  const { toast } = useToast();
  
  const { data: users, isLoading, error } = useQuery<User[]>({ 
    queryKey: ["/api/admin/users"],
    retry: false,
    meta: {
      headers: { "x-username": "RotemD" } 
    }
  });

  const togglePremium = useMutation({
    mutationFn: async ({ id, isPremium }: { id: string, isPremium: boolean }) => {
      await apiRequest("PATCH", `/api/admin/users/${id}`, { isPremium: !isPremium });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      toast({ title: "Success", description: "Premium status updated" });
    }
  });

  const resetPassword = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("PATCH", `/api/admin/users/${id}`, { password: "password123" });
    },
    onSuccess: () => {
      toast({ title: "Success", description: "Password reset to password123" });
    }
  });

  if (isLoading) return <div className="p-8 text-center" data-testid="text-loading">Loading users...</div>;
  
  if (error) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-destructive mb-4">403 Forbidden</h1>
          <p className="text-muted-foreground">Strict Hardcoded Security Check Failed: Only RotemD is allowed.</p>
          <Button className="mt-4" onClick={() => window.location.reload()}>Retry as RotemD</Button>
        </div>
      </div>
    );
  }

  const filteredUsers = users?.filter(u => u.username.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="mb-6">
        <Input 
          placeholder="Search users..." 
          value={search} 
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
          data-testid="input-search-users"
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Premium</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers?.map(user => (
            <TableRow key={user.id}>
              <TableCell className="font-mono text-xs">{user.id}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.isPremium ? "Yes" : "No"}</TableCell>
              <TableCell className="gap-2 flex">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => togglePremium.mutate({ id: user.id, isPremium: user.isPremium })}
                  data-testid={`button-toggle-premium-${user.id}`}
                >
                  Toggle Premium
                </Button>
                <Button 
                  size="sm" 
                  variant="secondary"
                  onClick={() => resetPassword.mutate(user.id)}
                  data-testid={`button-reset-password-${user.id}`}
                >
                  Reset Password
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
