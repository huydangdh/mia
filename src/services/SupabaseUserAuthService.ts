import AbstractUserAuthService from "./interface/AbstractUserAuthService"
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import User from "./model/MMUser";

class SupabaseUserAuthService extends AbstractUserAuthService {
  private supabase: SupabaseClient;

  constructor(supabaseUrl: string, supabaseKey: string) {
    super();
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  protected async handleEmailPasswordLogin(
    email: string,
    password: string
  ): Promise<User | null> {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.log("LS -> src/services/SupabaseUserAuthService.ts:20 -> user: ", data.user)

    if (error) {
      console.error("Login error:", error.message);
      return null;
    }

    if (!data.user) {
      console.error("User not found");
      return null;
    }

    return {
      id: data.user.id,
      username: data.user.user_metadata.username,
      email: data.user.email,
    };
  }

  protected async handleRegisterUser(
    username: string,
    email: string,
    password: string
  ): Promise<User | null> {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error("Registration error:", error.message);
      return null;
    }

    if (!data.user) {
      console.error("User not found after registration");
      return null;
    }

    const { error: updateError } = await this.supabase
      .from("users")
      .update({ username })
      .eq("id", data.user.id);

    if (updateError) {
      console.error("Error updating username:", updateError.message);
      return null;
    }

    return {
      id: data.user.id,
      username,
      email: data.user.email,
    };
  }

  protected async handleLogout(): Promise<void> {
    await this.supabase.auth.signOut();
  }
}

export default SupabaseUserAuthService;
