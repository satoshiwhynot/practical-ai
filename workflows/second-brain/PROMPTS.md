# Prompts from the article

Use these in starter-vault. Replace [FILENAME] with a source filename. The newsletter sources are fictional practice material.

## Ingest one source

```text
Read sources/[FILENAME] for the newsletter project.

Update wiki/projects/newsletter/current.md with the goal, current
constraints, approved decisions and unresolved questions supported
by this source. Leave missing information marked as unknown.

Record explicit decisions in decisions.md with links to the source.
Keep suggestions labeled as proposals.

Update wiki/index.md and append a short entry to log.md.
Do not change anything in sources/.

Show me which files changed and flag anything that conflicts with
the existing record.
```

## Save a session handoff

```text
Save a handoff for the newsletter project.

Update current.md with the current goal, completed work, unresolved
questions and the next action we actually agreed on.

Keep it under 200 words, excluding source links.
Record new approved decisions in decisions.md. Leave unapproved
ideas as proposals, and preserve superseded decisions as history.

Append a short entry to log.md and show me the changes.
Do not rewrite the source files.
```

## Check a fresh session

```text
Using the saved files for the newsletter project, answer these:

1. What is the current publishing frequency?
2. Which earlier plan did it replace?
3. Has a video edition been approved?
4. Which source supports the schedule change?
5. Who has agreed to edit the videos?

Cite the files supporting each answer. If an answer is not recorded,
say so. Do not fill gaps from assumptions or recalled chat details.
Do not edit any files during this check.
```

## Review the project record

```text
Review the newsletter project record without editing it.

Check whether current.md agrees with the approved decisions and
their sources. List broken links, unsupported claims, unresolved
conflicts and proposals presented as decisions.

For every issue, cite the relevant files and propose a correction.
Wait for my review before applying changes.
```
