UPDATE users
SET user_role=$2, user_names=$3
WHERE user_id=$1;