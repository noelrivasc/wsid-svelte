create table if not exists decisions (
  id    text primary key,
  title text not null
);

create table if not exists actions (
  decision_id text    not null references decisions(id) on delete cascade,
  seq         integer not null,
  type        text    not null,
  version     integer not null,
  payload     text    not null,
  created_at  text    not null,
  primary key (decision_id, seq)
);

create index if not exists actions_by_decision on actions(decision_id, seq);
