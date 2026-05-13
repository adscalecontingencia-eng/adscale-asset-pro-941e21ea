create or replace function public.grant_admin_to_owner()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.email = 'adscalecontingencia@gmail.com' then
    insert into public.user_roles (user_id, role)
    values (new.id, 'admin')
    on conflict do nothing;
  end if;
  return new;
end;
$$;

revoke execute on function public.grant_admin_to_owner() from public, anon, authenticated;

drop trigger if exists on_auth_user_created_grant_admin on auth.users;
create trigger on_auth_user_created_grant_admin
  after insert on auth.users
  for each row execute function public.grant_admin_to_owner();