/* eslint-disable @typescript-eslint/no-explicit-any */
import { type APIResponse } from "@/lib/types/api";
import { type SurveyResponse } from "@/lib/types/db";
import { supabase } from "./supabase";

const TABLE_NAME = "mr_survey_responses";

export const getResponsesBySessionId = async (
  sessionId: string,
): Promise<APIResponse<SurveyResponse[]>> => {
  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select("*")
      .eq("session_id", sessionId).order("updated_at", { ascending: true });

    if (error) {
      return {
        ok: false,
        data: [],
        message: error.message,
      };
    }

    return {
      ok: true,
      data: data || [],
      message: "Responses retrieved successfully",
    };
  } catch (error: any) {
    console.error("Error retrieving responses:", error.message);
    return {
      ok: false,
      data: [],
      message: error.message,
    };
  }
};

export const createorUpdateResponse = async (
  updates: Partial<SurveyResponse>,
): Promise<APIResponse<SurveyResponse[]>> => {
  try {
    // Check if record exists with session_id and question_id
    const {data:existData, error:existError} = await supabase
      .from(TABLE_NAME)
      .select("*")
      .eq("session_id", updates.session_id)
      .eq("question_id", updates.question_id)
      .single();
    if (existError && existError.code !== 'PGRST116') { // PGRST116: No rows found
      return {
        ok: false,
        data: [],
        message: existError.message,
      };
    }

    if (existData) {
      // If exists, update the record
      const { data, error } = await supabase.from(TABLE_NAME)
        .update(updates)
        .eq("id", existData.id)
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
        data: [data],
        message: "Response updated successfully",
      };
    }

    // If not created, insert new record
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .upsert(updates)
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
      message: "Response created successfully",
    };
  } catch (error: any) {
    console.error("Error creating or updating response:", error.message);
    return {
      ok: false,
      data: [],
      message: error.message,
    };
  }
};
