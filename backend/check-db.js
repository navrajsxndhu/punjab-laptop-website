const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

async function run() {
  const { data, error } = await supabase.rpc('get_tables'); // Or just fetch from a known table
  if (error) {
    console.log('Cant use RPC, trying select from information_schema');
    const { data: schemaData, error: schemaError } = await supabase.from('information_schema.tables').select('table_name').eq('table_schema', 'public');
    console.log(schemaData || schemaError);
  } else {
    console.log(data);
  }
}
run();
