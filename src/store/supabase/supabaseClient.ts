import { createClient } from "@supabase/supabase-js";
import { Tables, type Database } from "./database.types";

// Create a single supabase client for interacting with your database
export const supabase = createClient<Database>(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_ANON_KEY);

// export const getRecord = async <
// 	T extends
// 		| "academic_years"
// 		| "cover_types"
// 		| "notes"
// 		| "paper_sizes"
// 		| "subjects"
// 		| "teachers"
// 		| "terms"
// 		| "users_data"
// 		| { schema: "public" }
// >(
// 	table: Tables<T>,
// 	value: string
// ) => {
// 	const { data, error } = await supabase.from(table).select().eq("id", value);
// 	return { data, error };
// };
