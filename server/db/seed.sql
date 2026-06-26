-- Seed data for Syntax Sprint
-- Run in the Supabase SQL Editor (runs as service_role, bypasses RLS)
-- Users must already exist in auth.users before running this script

-- Users
insert into public.users (user_id, username) values
  ('b46dc1df-f137-429e-8797-642082a288ef', 'ByteRacer'),
  ('9e2014e4-1f7a-4686-aa69-6ec01379fc82', 'KeystrokeKing'),
  ('46c834f8-a2e8-46c4-9ab7-7ce4d97ae7e1', 'CodeSniper'),
  ('ba3b8843-ffe6-47bd-ba5b-8f9a4e3c130c', 'LoopLegend'),
  ('359e40ae-1429-454d-b994-8bea7b986035', 'SyntaxNinja');

-- Scores (2 per user)
insert into public.scores (user_id, cpm, accuracy, played_at) values
  -- ByteRacer
  ('b46dc1df-f137-429e-8797-642082a288ef', 187, 87.3, '2026-06-25 08:14:22+00'),
  ('b46dc1df-f137-429e-8797-642082a288ef', 243, 94.1, '2026-06-25 11:47:05+00'),
  -- KeystrokeKing
  ('9e2014e4-1f7a-4686-aa69-6ec01379fc82', 312, 72.8, '2026-06-25 13:02:38+00'),
  ('9e2014e4-1f7a-4686-aa69-6ec01379fc82', 198, 98.5, '2026-06-25 15:30:11+00'),
  -- CodeSniper
  ('46c834f8-a2e8-46c4-9ab7-7ce4d97ae7e1', 274, 81.6, '2026-06-25 17:55:49+00'),
  ('46c834f8-a2e8-46c4-9ab7-7ce4d97ae7e1', 156, 65.4, '2026-06-25 20:08:33+00'),
  -- LoopLegend
  ('ba3b8843-ffe6-47bd-ba5b-8f9a4e3c130c', 298, 90.2, '2026-06-25 22:41:17+00'),
  ('ba3b8843-ffe6-47bd-ba5b-8f9a4e3c130c', 221, 76.9, '2026-06-26 00:19:44+00'),
  -- SyntaxNinja
  ('359e40ae-1429-454d-b994-8bea7b986035', 265, 88.7, '2026-06-26 03:37:02+00'),
  ('359e40ae-1429-454d-b994-8bea7b986035', 220, 70.2, '2026-06-26 07:52:28+00');

-- Snippets
insert into public.snippets (language, code_text, logic_hint, difficulty) values
  ('javascript', 'const x = arr.filter(n => n % 2 === 0)', 'Filter even numbers from an array', 'easy'),
  ('javascript', 'const sum = arr.reduce((acc, curr) => acc + curr, 0)', 'Calculate the total sum of all numbers in an array', 'easy'),
  ('javascript', 'function flatten(arr) { return arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatten(val) : val), []); }', 'Recursively flatten a deeply nested array into a single level', 'medium'),
  ('javascript', 'const curry = (fn) => { const curried = (...args) => args.length >= fn.length ? fn(...args) : (...nextArgs) => curried(...args, ...nextArgs); return curried; }', 'Convert a function that takes multiple arguments into a sequence of nesting functions', 'hard'),
  ('python', 'evens = [n for n in numbers if n % 2 == 0]', 'Use list comprehension to filter out even numbers from a list', 'easy'),
  ('python', 'inverted = {v: k for k, v in original_dict.items()}', 'Swap keys and values in a dictionary assuming all values are unique', 'easy'),
  ('python', 'is_anagram = lambda s1, s2: sorted(s1) == sorted(s2)', 'Check if two strings are anagrams by comparing their sorted character representations', 'medium'),
  ('python', E'while low <= high:\n    mid = (low + high) // 2\n    if arr[mid] == target:\n        return mid\n    elif arr[mid] < target:\n        low = mid + 1\n    else:\n        high = mid - 1', 'Implement standard iterative binary search on a sorted array', 'medium'),
  ('typescript', 'function isString(val: unknown): val is string { return typeof val === "string"; }', 'Define a custom type guard to narrow down an unknown type to a string safely', 'medium'),
  ('typescript', 'type DeepReadonly<T> = { readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P] };', 'Create a utility type that makes all properties of an object deeply immutable', 'hard');