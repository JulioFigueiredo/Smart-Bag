import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function Login() {
  return (
    <section className="flex h-screen w-full items-center justify-center p-7 lg:p-0">
      <div className="w-fit">
        <div className="mb-8 space-y-2">
          <h1 className="text-GRAY_DARK text-3xl font-bold lg:text-4xl">
            Acesse a plataforma
          </h1>
          <p className="text-GRAY_DARK text-sm lg:text-base">
            Faça login ou registre-se para acessar sua conta agora.
          </p>
        </div>

        <div className="mb-4">
          <Label htmlFor="user" className="text-GRAY_DARK font-bold">
            Usuário
          </Label>
          <Input
            type="email"
            id="user"
            placeholder="Digite seu e-mail"
            className="h-11 text-lg"
          />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-GRAY_DARK font-bold">
              Senha
            </Label>

            <Link
              href="/"
              className="text-GRAY_DARK text-sm font-medium hover:underline"
            >
              Esqueceu a senha?
            </Link>
          </div>

          <Input
            type="password"
            id="password"
            placeholder="Digite sua senha"
            className="h-11 text-lg"
          />
        </div>

        <div className="mb-4 mt-2 flex items-center">
          <Input type="checkbox" id="checkbox" className="mr-1 size-4" />
          <Label htmlFor="checkbox" className="text-[1.0625rem] font-medium">
            Lembrar senha
          </Label>
        </div>

        <Button className="bg-RED_DARK hover:bg-RED_DARK_HOVER mb-4 h-14 w-full text-[1.0625rem] font-bold">
          <Link href={"/main"}>Entrar</Link>
        </Button>

        <span>
          Ainda não tem uma conta?{" "}
          <Link href="/" className="text-GRAY_DARK font-bold hover:underline">
            Criar conta
          </Link>
        </span>
      </div>
    </section>
  );
}
