# AI video workflow: ten detailed production prompts

Expanded prompts for a project that needs more detailed instructions and review criteria. The article contains shorter versions for the same ten tasks. Fill in the placeholders before use.

## Prompt 1: Put Claude in charge of the handoffs

```text
Direct this short film. I will communicate with you as the main agent.

Before production:
1. Ask for the runtime, aspect ratio, total budget, music and subtitles.
2. Check access to image generation, Codex, FFmpeg, Python and Seedance.
3. Check whether ARK_API_KEY is configured without printing its value.
4. Create a new project folder and keep all project files there.

Your job: story, shot design, prompts, tool coordination, visual review
and post-production.
Codex's job: style tests, reference sheets and shot reference images.
Seedance's job: animate approved shots.
My job: approve the story, visual style and paid generation; judge
motion and sound.

Do not generate images before I approve the story.
Do not produce final shot images before I approve the style.
Before each paid video task, request an independent review of the
prompt and references. Show the cost estimate and wait for approval.

Try an edit or a local repair before proposing a reshoot.
Save new versions separately. Do not overwrite or delete old versions.
State exactly what you inspected and what you could not inspect.
Do not buy credits or top up an account. If funding runs out, stop
paid work and assemble a rough cut from the available clips.
```

## Prompt 2: 1. Make the story work while it is still text

```text
My film idea: [idea or rough story]
Runtime: [seconds]
Music: [track, duration and BPM, if applicable]
Reference film: [optional]

Help me develop a complete story. Ask about unclear points and wait
for my approval before moving into production.

Write the story shot by shot. Check:
- Why each action happens and where every important object comes from.
- Whether each action is physically possible within the story's rules.
- The film's central idea, expressed in one sentence.
- What the viewer sees in the opening seconds.
- How secondary characters react, with different reaction timings.
- Which shots are likely to be difficult for a video model.

Prefer self-contained beats unless continuous action is essential.
If music is part of the plan, propose where the turning point and
important actions should land in the track.
```

## Prompt 3: 1. Make the story work while it is still text

```text
Read this shot-by-shot story as a first-time viewer. Review only;
do not edit files.

First, describe the story you understood from the shots alone.
Then check causality, physical logic, the opening, reaction timing
and shots likely to fail in generation.

For each issue, give the shot, the problem and a suggested change.
Label uncertain concerns as possible issues.
Finish with PASS or FAIL and explain any blocking problems.
```

## Prompt 4: 2. Design shots you would actually want to watch

```text
Turn the approved story into a shot list. For each shot, specify:
- Timeline position and intended edit duration.
- Requested generation duration, using a length the model supports.
- Shot size, camera position and camera movement.
- Character movement, described as screen-left or screen-right.
- The expression or action carrying the beat.
- What changes over the shot and why.
- The transition into the next shot.

Leave trimming room around important actions where the budget allows.
Vary shot sizes and viewpoints. Make movement serve the scene.

Design a scene-by-scene palette based on: [preferences].
Make simple 1920x1080 composition sketches using color blocks.
Mark the main subject and any relevant 38% / 62% guides.
Show the sketches together, then inspect them in grayscale for
subject-background separation. Wait for approval.
```

## Prompt 5: 4. Make the first and last frames agree

```text
Review these first and last frames at full resolution.
Materials: [first frame], [last frame], [reference sheets], [shot brief]

Check:
1. Every object needed for an action is visible at the start.
2. Secondary characters are positioned so their reactions can be seen.
3. Group members have distinct poses rather than identical staging.
4. There is space for the intended movement and any incoming object.
5. Wind direction agrees across clothing and other moving elements.
6. Important details remain readable at phone size.
7. There are no extra objects, stray marks or unexplained duplicates.
8. Matching elements align when the frames are overlaid.
9. Dimensions and aspect ratio match.

Name the file and location of each problem. Wait for approval before
editing. Compare the whole result after an edit; if unrelated areas
changed, identify them too.
```

## Prompt 6: 5. Write what happens between the frames

```text
[STYLE]
[Approved visual style.] Match the reference frames' colors and design.

[CAMERA]
Duration: [supported duration]. Shot size: [size]. Viewpoint: [position].
Camera movement: [movement, or explicitly locked off]. One shot.

[COMPOSITION AND COLOR]
[Where the people and objects are. Lighting and background colors.]

[CHARACTERS]
[Appearance, clothing and fixed props for each character.]

[ACTION BY TIME]
0.0-0.2 seconds: hold the opening composition.
[Time range]: [Who acts, what causes the action, hand position,
expression and direction of travel in screen coordinates.]
Final 0.3 seconds: settle into the approved ending composition.

[SOUND]
[Sounds and their visible causes.] Characters remain silent.

[CONTINUITY]
Maintain the established cast, prop counts, clothing and identities.
Keep the agreed visual style through the entire shot.
No added text, subtitles or watermarks.
```

## Prompt 7: 5. Write what happens between the frames

```text
Review only. Do not edit files or submit a generation task.
Materials: [video prompt], [first frame], [last frame],
[reference sheets], [shot list], [palette rules].

Compare every instruction with the images: positions, directions,
colors, people, props, clothing and expressions.
Check camera continuity, scale and background consistency.
Compare with the references and neighboring shots.
Check whether the action is possible and its cause is clear.
Identify likely ambiguities and generation failures.

Finish with PASS or FAIL. If FAIL, list each required correction.
```

## Prompt 8: 7. Assemble the film before polishing every clip

```text
Assemble the approved clips with FFmpeg and Python.

Follow the shot list and transition plan: [plan].
For custom sampled motion blur, test the proposed 8-16 samples and
half-frame shutter treatment on a short section before applying it.

Grade by story section. Preserve the approved hues, skin tones and
accent colors. Do not add grain, glow or vignettes without approval.

Inspect source color metadata and confirm the interpretation before
converting. Use lossless intermediates where practical. Export for
the agreed delivery color space with matching metadata.

If upscaling from 720p to 1080p, test Lanczos and light sharpening.
Do not interpolate the whole film automatically.

Use beats measured from the original music track.
Inspect at least three frames before and after every cut.
Keep the original clips and save this edit as a new version.
```

## Prompt 9: 8. Watch it without explaining the story over it

```text
This is the finished film: [file]. Review it without prior conclusions.

Decode the file and inspect multiple full-resolution frames per shot.
Check at least three frames on either side of each cut.

First, describe the story you understood. List confusing moments.
Then check repeated actions, prop counts, continuity, sudden jumps,
color shifts, distorted faces and accidental text.

For each issue, give the timestamp, frame number and description.
Separate blocking problems from minor issues.

State what you could not evaluate. Frame sampling alone does not
establish that motion or audio has been reviewed.
```

## Prompt 10: Optional: share the directing work across four agents

```text
Use a main production agent and three supporting agents.
Requirements and prior decisions: [file]
Total budget: [amount and currency]
Spending policy: [manual approval, or explicitly delegated limits]

Producer: perform the production work and coordinate the tools.
Reviewer: inspect every stage without editing it. Require a clear
PASS before any paid video submission.
Requirements monitor: turn my instructions into a checklist and
check each stage against it, including the producer's decisions.
Preference representative: summarize my stated preferences and
resolve uncertain choices with reasons and confidence.

After each stage, send the work to the reviewer and then the monitor.
Use the representative to resolve disagreements within the authority
I have given it. Outside that authority, ask me.

Record decisions and estimated and actual costs.
Do not top up accounts or buy credits. If the budget or available
balance is exhausted, stop paid work and assemble a rough cut.
```
