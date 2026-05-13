import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "@/components/Logo";
import { toast } from "sonner";
import SEO from "@/components/SEO";

const ADMIN_EMAIL = "adscalecontingencia@gmail.com";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(ADMIN_EMAIL);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate("/admin", { replace: true });
    });
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Try login first
    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!loginError) {
      toast.success("Bem-vindo de volta.");
      navigate("/admin", { replace: true });
      setLoading(false);
      return;
    }

    // First-time setup: if credentials don't exist yet, register them.
    if (loginError.message.toLowerCase().includes("invalid")) {
      const { error: signupError } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/admin` },
      });
      if (signupError) {
        toast.error(signupError.message);
        setLoading(false);
        return;
      }
      // auto_confirm is on, so try login again
      const { error: retryError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (retryError) {
        toast.error(retryError.message);
      } else {
        toast.success("Conta de admin ativada.");
        navigate("/admin", { replace: true });
      }
    } else {
      toast.error(loginError.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <SEO
        title="Acesso restrito · AD Scale"
        description="Painel interno da AD Scale."
        canonical="/admin/login"
        noIndex
      />
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Logo size={28} withTagline />
        </div>
        <div className="bg-card border border-border/50 rounded-2xl p-8">
          <h1 className="font-display text-2xl font-bold mb-1">Painel interno</h1>
          <p className="text-muted-foreground text-sm mb-6">
            Acesso restrito ao time AD Scale.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
