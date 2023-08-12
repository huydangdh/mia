import AbstractUserAuthService from "./interface/AbstractUserAuthService";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { User, AuthData } from "./model/MMUser";
import { Accordion } from "react-bootstrap";

const supabaseUrl = "https://gtjynrhgxnemxzyvdrsa.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0anlucmhneG5lbXh6eXZkcnNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzg0Mzg4MzcsImV4cCI6MTk5NDAxNDgzN30.Kjoe4qrCyfr2nEbZVaCd55GLmcw7pD-h-VjsJFoURF0";

class SupabaseUserAuthService extends AbstractUserAuthService {
  private supabase: SupabaseClient;

  constructor() {
    super();
    this.providerName = "supabase"
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  protected async handleEmailPasswordLogin(
    email: string,
    password: string
  ): Promise<AuthData | null> {
    let _authData: AuthData = {
      user: {
        id: null,
        username: null,
        email: null,
        permissions: [],
      },
      provider: this.providerName,
      accessToken: "NULL",
    };

    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });
    console.log(
      "🚀 ~ file: SupabaseUserAuthService.ts:24 ~ SupabaseUserAuthService ~ data:",
      data
    );
    if (error) {
      console.error("Login error:", error.message);
      return _authData;
    }

    if (!data.user) {
      console.error("User not found");
      return _authData;
    }

    _authData = {
      user: {
        id: data.user.id,
        username: data.user.user_metadata.username,
        email: data.user.email,
        permissions: [],
      },
      provider: this.providerName,
      accessToken: "NULL",
    };
    return _authData;
  }

  protected async handleRegisterUser(
    username: string,
    email: string,
    password: string
  ): Promise<AuthData | null> {
    let _authData: AuthData = {
      user: {
        id: null,
        username: null,
        email: null,
        permissions: [],
      },
      provider: this.providerName,
      accessToken: "NULL",
    };
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

    _authData = {
      user: {
        id: data.user.id,
        username: data.user.user_metadata.username,
        email: data.user.email,
        permissions: [],
      },
      provider: this.providerName,
      accessToken: "NULL",
    };
    return _authData;
  }

  protected async handleLogout(): Promise<void> {
    await this.supabase.auth.signOut();
  }
}

export default SupabaseUserAuthService;
