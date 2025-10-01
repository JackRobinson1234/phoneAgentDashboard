-- Sample Data for Testing Phone Agent Analytics Dashboard
-- Run this in your Supabase SQL Editor to populate test data

-- Insert sample calls
INSERT INTO calls (call_id, session_id, start_time, end_time, duration_seconds, user_phone, initial_state, final_state, completion_status, total_states_visited, total_llm_calls, total_tokens_used)
VALUES 
  (
    gen_random_uuid(),
    'session_001',
    NOW() - INTERVAL '2 hours',
    NOW() - INTERVAL '1 hour 58 minutes',
    120,
    '+1234567890',
    'greeting',
    'appointment_confirmed',
    'completed',
    5,
    8,
    1250
  ),
  (
    gen_random_uuid(),
    'session_002',
    NOW() - INTERVAL '5 hours',
    NOW() - INTERVAL '4 hours 57 minutes',
    180,
    '+1234567891',
    'greeting',
    'information_provided',
    'completed',
    6,
    10,
    1580
  ),
  (
    gen_random_uuid(),
    'session_003',
    NOW() - INTERVAL '1 day',
    NOW() - INTERVAL '1 day' + INTERVAL '3 minutes',
    180,
    '+1234567892',
    'greeting',
    'error_state',
    'error',
    3,
    5,
    750
  ),
  (
    gen_random_uuid(),
    'session_004',
    NOW() - INTERVAL '12 hours',
    NULL,
    NULL,
    '+1234567893',
    'greeting',
    NULL,
    'in_progress',
    2,
    3,
    450
  );

-- Get the call_ids for inserting state transitions
-- Note: You'll need to replace these UUIDs with actual call_ids from the calls table

-- For the first call (session_001) - completed appointment booking
WITH call_data AS (
  SELECT call_id FROM calls WHERE session_id = 'session_001' LIMIT 1
)
INSERT INTO state_transitions (call_id, timestamp, sequence_number, from_state, to_state, transition_type, user_input, agent_response, context_snapshot, context_updates, llm_model, llm_tokens_used, processing_time_ms)
SELECT 
  call_id,
  NOW() - INTERVAL '2 hours',
  1,
  NULL,
  'greeting',
  'optimized',
  'Hello',
  'Hi! Welcome to our appointment booking service. How can I help you today?',
  '{"user_name": null, "appointment_date": null}'::jsonb,
  '{}'::jsonb,
  'gpt-4',
  150,
  250
FROM call_data
UNION ALL
SELECT 
  call_id,
  NOW() - INTERVAL '2 hours' + INTERVAL '30 seconds',
  2,
  'greeting',
  'intent_capture',
  'continue',
  'I need to book an appointment',
  'Great! I can help you with that. What type of appointment are you looking for?',
  '{"user_name": null, "appointment_date": null}'::jsonb,
  '{"intent": "book_appointment"}'::jsonb,
  'gpt-4',
  180,
  300
FROM call_data
UNION ALL
SELECT 
  call_id,
  NOW() - INTERVAL '2 hours' + INTERVAL '1 minute',
  3,
  'intent_capture',
  'collect_details',
  'continue',
  'A dental checkup',
  'Perfect! When would you like to schedule your dental checkup?',
  '{"user_name": null, "appointment_date": null, "intent": "book_appointment"}'::jsonb,
  '{"appointment_type": "dental_checkup"}'::jsonb,
  'gpt-4',
  200,
  280
FROM call_data
UNION ALL
SELECT 
  call_id,
  NOW() - INTERVAL '2 hours' + INTERVAL '1 minute 30 seconds',
  4,
  'collect_details',
  'confirm_details',
  'continue',
  'Next Tuesday at 2pm',
  'Let me confirm: You want to book a dental checkup for next Tuesday at 2:00 PM. Is that correct?',
  '{"user_name": null, "appointment_date": null, "intent": "book_appointment", "appointment_type": "dental_checkup"}'::jsonb,
  '{"appointment_date": "2025-10-08", "appointment_time": "14:00"}'::jsonb,
  'gpt-4',
  220,
  320
FROM call_data
UNION ALL
SELECT 
  call_id,
  NOW() - INTERVAL '2 hours' + INTERVAL '2 minutes',
  5,
  'confirm_details',
  'appointment_confirmed',
  'optimized',
  'Yes, that works',
  'Excellent! Your dental checkup is confirmed for Tuesday, October 8th at 2:00 PM. You will receive a confirmation text shortly. Is there anything else I can help you with?',
  '{"user_name": null, "appointment_date": "2025-10-08", "appointment_time": "14:00", "intent": "book_appointment", "appointment_type": "dental_checkup"}'::jsonb,
  '{"appointment_confirmed": true}'::jsonb,
  'gpt-4',
  250,
  350
FROM call_data;

-- For the second call (session_002) - information request
WITH call_data AS (
  SELECT call_id FROM calls WHERE session_id = 'session_002' LIMIT 1
)
INSERT INTO state_transitions (call_id, timestamp, sequence_number, from_state, to_state, transition_type, user_input, agent_response, context_snapshot, context_updates, llm_model, llm_tokens_used, processing_time_ms)
SELECT 
  call_id,
  NOW() - INTERVAL '5 hours',
  1,
  NULL,
  'greeting',
  'optimized',
  'Hi there',
  'Hello! How can I assist you today?',
  '{}'::jsonb,
  '{}'::jsonb,
  'gpt-4',
  140,
  230
FROM call_data
UNION ALL
SELECT 
  call_id,
  NOW() - INTERVAL '5 hours' + INTERVAL '20 seconds',
  2,
  'greeting',
  'intent_capture',
  'continue',
  'What are your business hours?',
  'Our business hours are Monday through Friday, 9 AM to 6 PM, and Saturday 10 AM to 4 PM. We are closed on Sundays.',
  '{}'::jsonb,
  '{"intent": "business_hours_inquiry"}'::jsonb,
  'gpt-4',
  160,
  270
FROM call_data
UNION ALL
SELECT 
  call_id,
  NOW() - INTERVAL '5 hours' + INTERVAL '40 seconds',
  3,
  'intent_capture',
  'information_provided',
  'continue',
  'Thank you',
  'You are welcome! Is there anything else I can help you with?',
  '{"intent": "business_hours_inquiry"}'::jsonb,
  '{"information_provided": true}'::jsonb,
  'gpt-4',
  130,
  240
FROM call_data;

-- For the third call (session_003) - error case
WITH call_data AS (
  SELECT call_id FROM calls WHERE session_id = 'session_003' LIMIT 1
)
INSERT INTO state_transitions (call_id, timestamp, sequence_number, from_state, to_state, transition_type, user_input, agent_response, context_snapshot, context_updates, llm_model, llm_tokens_used, processing_time_ms)
SELECT 
  call_id,
  NOW() - INTERVAL '1 day',
  1,
  NULL,
  'greeting',
  'optimized',
  'Hello',
  'Hi! How can I help you?',
  '{}'::jsonb,
  '{}'::jsonb,
  'gpt-4',
  145,
  260
FROM call_data
UNION ALL
SELECT 
  call_id,
  NOW() - INTERVAL '1 day' + INTERVAL '30 seconds',
  2,
  'greeting',
  'intent_capture',
  'fallback',
  'asdfghjkl',
  'I am sorry, I did not understand that. Could you please rephrase?',
  '{}'::jsonb,
  '{"fallback_count": 1}'::jsonb,
  'gpt-4',
  170,
  290
FROM call_data
UNION ALL
SELECT 
  call_id,
  NOW() - INTERVAL '1 day' + INTERVAL '1 minute',
  3,
  'intent_capture',
  'error_state',
  'error',
  'qwertyuiop',
  'I am having trouble understanding. Let me transfer you to a human agent.',
  '{"fallback_count": 1}'::jsonb,
  '{"error": "max_fallback_exceeded"}'::jsonb,
  'gpt-4',
  180,
  310
FROM call_data;

-- Verify the data
SELECT 'Calls inserted:' as info, COUNT(*) as count FROM calls;
SELECT 'State transitions inserted:' as info, COUNT(*) as count FROM state_transitions;

-- View sample data
SELECT 
  c.session_id,
  c.completion_status,
  c.total_states_visited,
  COUNT(st.id) as actual_transitions
FROM calls c
LEFT JOIN state_transitions st ON c.call_id = st.call_id
GROUP BY c.call_id, c.session_id, c.completion_status, c.total_states_visited
ORDER BY c.start_time DESC;
