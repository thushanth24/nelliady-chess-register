-- Create a function to update payment status
CREATE OR REPLACE FUNCTION public.update_payment_status(
  p_id UUID,
  p_status TEXT
) 
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result JSONB;
BEGIN
  -- Update the payment status for the given player ID
  UPDATE public.players
  SET payment_status = p_status::text
  WHERE id = p_id
  RETURNING to_jsonb(players.*) INTO result;
  
  -- If no rows were updated, return an error
  IF result IS NULL THEN
    RETURN jsonb_build_object('error', 'Player not found');
  END IF;
  
  -- Return the updated player record
  RETURN result;
EXCEPTION WHEN OTHERS THEN
  RETURN jsonb_build_object('error', SQLERRM);
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.update_payment_status(UUID, TEXT) TO authenticated;

-- Add a comment for the function
COMMENT ON FUNCTION public.update_payment_status IS 'Updates the payment status of a player';

-- Add an index on the payment_status column if it doesn't exist
CREATE INDEX IF NOT EXISTS idx_players_payment_status ON public.players(payment_status);
