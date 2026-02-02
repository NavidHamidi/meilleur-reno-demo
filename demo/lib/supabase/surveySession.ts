/* eslint-disable @typescript-eslint/no-explicit-any */
import { type APIResponse } from "@/lib/types/api";
import { type SurveySession } from "@/lib/types/db";
import { supabase } from "./supabase";

const TABLE_NAME = "mr_survey_sessions";

export const createSession = async (): Promise<
  APIResponse<SurveySession[]>
> => {
  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .insert({ current_step: 0, completed: false })
      .select()
      .single();

    if (error) {
      return {
        ok: false,
        data: [],
        message: error.message,
      };
    }
    return {
      ok: true,
      data: data ? [data] : [],
      message: "Session created successfully",
    };
  } catch (error: any) {
    console.error("Error creating session:", error.message);
    return {
      ok: false,
      data: [],
      message: error.message,
    };
  }
};

export const updateSession = async (
  sessionId: string,
  updates: Partial<SurveySession>,
): Promise<APIResponse<SurveySession[]>> => {
  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .update(updates)
      .eq("id", sessionId)
      .select()
      .single();

    if (error) {
      return {
        ok: false,
        data: [],
        message: error.message,
      };
    }
    return {
      ok: true,
      data: data ? [data] : [],
      message: "Session updated successfully",
    };
  } catch (error: any) {
    console.error("Error updating session:", error.message);
    return {
      ok: false,
      data: [],
      message: error.message,
    };
  }
};
