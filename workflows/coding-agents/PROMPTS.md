# Three bounded jobs

## Inspect before changing

```text
Read the task and project runbook. Inspect the current import flow and data model.
State the acceptance criteria, risks and open questions.
Run the relevant baseline checks using the real project commands.
Do not change the app until the missing transaction policy is resolved.
```

## Implement

```text
Implement the agreed task within the existing app's structure.
Use a real CSV parser. Keep fixtures and expected outcomes as the contract.
Check the running UI, state replacement and data persistence.
Report the files changed, commands run and unresolved failures.
Do not treat generated code as proof that the feature works.
```

## Review

```text
Review the change against TASK.md. Exercise each supplied fixture.
Verify malformed input does not mutate existing data and choosing a new file
replaces the previous preview. Cite observed evidence.
Mark checks you did not run as NOT RUN.
```
