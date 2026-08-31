'use client';

import { useMemo, useState } from 'react';
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  BrainCircuit,
  Check,
  ChevronDown,
  ChevronUp,
  CircleDollarSign,
  Compass,
  GitCompareArrows,
  Lightbulb,
  MapPin,
  RefreshCw,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';

type Career = {
  id: string;
  title: string;
  family: string;
  description: string;
  skills: string[];
  values: string[];
  concepts: string[];
  workStyles: string[];
  outlook: string;
  range: string;
  bridge: string[];
  nextStep: string;
};

const skillOptions = [
  'Data analysis', 'Storytelling', 'Research', 'Problem solving',
  'Empathy', 'Design thinking', 'Writing', 'Project leadership',
];
const valueOptions = ['Impact', 'Autonomy', 'Learning', 'Stability', 'Creativity', 'Collaboration'];
const levels = ['Starting out', '1–3 years', '4–7 years', '8+ years'];
const workStyles = ['Remote', 'Hybrid', 'On-site', 'Flexible'];

const careers: Career[] = [
  {
    id: 'insights', title: 'Insights Strategist', family: 'Research · Strategy',
    description: 'Turns customer and market evidence into focused recommendations for product and business teams.',
    skills: ['Research', 'Data analysis', 'Storytelling', 'Problem solving'],
    values: ['Impact', 'Learning', 'Collaboration'], concepts: ['decisions', 'information', 'research', 'strategy', 'customers', 'complex'],
    workStyles: ['Remote', 'Hybrid', 'Flexible'], outlook: 'Strong demand', range: '$85k–$132k',
    bridge: ['Research planning', 'Executive synthesis'], nextStep: 'Build a two-page insight brief from a public dataset.',
  },
  {
    id: 'product-ops', title: 'Product Operations Manager', family: 'Product · Operations',
    description: 'Creates the systems, rituals, and decision signals that help product teams execute with clarity.',
    skills: ['Project leadership', 'Problem solving', 'Data analysis', 'Empathy'],
    values: ['Impact', 'Stability', 'Collaboration'], concepts: ['systems', 'teams', 'decisions', 'organize', 'process', 'product'],
    workStyles: ['Hybrid', 'On-site', 'Flexible'], outlook: 'Growing field', range: '$92k–$145k',
    bridge: ['Product lifecycle fluency', 'Workflow design'], nextStep: 'Map and improve one recurring team workflow.',
  },
  {
    id: 'ux-research', title: 'UX Researcher', family: 'Design · Research',
    description: 'Studies user behavior and needs, then translates findings into better product experiences.',
    skills: ['Research', 'Empathy', 'Storytelling', 'Design thinking'],
    values: ['Impact', 'Creativity', 'Learning'], concepts: ['people', 'behavior', 'research', 'users', 'why', 'experience'],
    workStyles: ['Remote', 'Hybrid', 'Flexible'], outlook: 'Steady demand', range: '$78k–$128k',
    bridge: ['Interview moderation', 'Usability testing'], nextStep: 'Run five interviews and synthesize patterns in a research readout.',
  },
  {
    id: 'data-storyteller', title: 'Data Storytelling Lead', family: 'Analytics · Communication',
    description: 'Shapes analytical findings into narratives and visual explanations that move decisions forward.',
    skills: ['Data analysis', 'Storytelling', 'Writing', 'Design thinking'],
    values: ['Creativity', 'Impact', 'Autonomy'], concepts: ['data', 'explain', 'information', 'visual', 'decisions', 'communicate'],
    workStyles: ['Remote', 'Hybrid', 'Flexible'], outlook: 'High demand', range: '$88k–$138k',
    bridge: ['Data visualization', 'Narrative structure'], nextStep: 'Redesign one dense report into a five-slide decision story.',
  },
  {
    id: 'service-designer', title: 'Service Designer', family: 'Design · Systems',
    description: 'Improves end-to-end services by connecting customer needs, processes, people, and technology.',
    skills: ['Design thinking', 'Empathy', 'Research', 'Project leadership'],
    values: ['Creativity', 'Impact', 'Collaboration'], concepts: ['systems', 'people', 'experience', 'improve', 'customers', 'design'],
    workStyles: ['Hybrid', 'On-site', 'Flexible'], outlook: 'Emerging field', range: '$80k–$126k',
    bridge: ['Journey mapping', 'Facilitation'], nextStep: 'Create a service blueprint for a frustrating everyday experience.',
  },
  {
    id: 'learning-designer', title: 'Learning Experience Designer', family: 'Education · Design',
    description: 'Designs effective learning journeys that make complex ideas easier to understand and apply.',
    skills: ['Writing', 'Storytelling', 'Empathy', 'Design thinking'],
    values: ['Learning', 'Creativity', 'Impact'], concepts: ['teach', 'explain', 'learning', 'complex', 'people', 'content'],
    workStyles: ['Remote', 'Hybrid', 'Flexible'], outlook: 'Steady demand', range: '$70k–$112k',
    bridge: ['Instructional design', 'Learning assessment'], nextStep: 'Turn a topic you know well into a 15-minute learning module.',
  },
];

const conceptGroups: Record<string, string[]> = {
  decisions: ['decision', 'decide', 'recommend', 'strategy', 'direction'],
  information: ['information', 'data', 'evidence', 'knowledge', 'insight'],
  people: ['people', 'human', 'customer', 'user', 'team'],
  explain: ['explain', 'communicate', 'story', 'write', 'present'],
  improve: ['improve', 'solve', 'better', 'optimize', 'change'],
  systems: ['system', 'process', 'workflow', 'organize', 'operations'],
  learning: ['learn', 'teach', 'education', 'develop', 'coach'],
};

function goalConcepts(goal: string) {
  const text = goal.toLowerCase();
  return Object.entries(conceptGroups)
    .filter(([, words]) => words.some((word) => text.includes(word)))
    .map(([concept]) => concept);
}

export default function Home() {
  const [goal, setGoal] = useState('Turn complex information into useful decisions');
  const [skills, setSkills] = useState(['Data analysis', 'Storytelling', 'Research']);
  const [values, setValues] = useState(['Impact', 'Learning']);
  const [level, setLevel] = useState('1–3 years');
  const [workStyle, setWorkStyle] = useState('Flexible');
  const [expanded, setExpanded] = useState<string | null>('insights');
  const [compare, setCompare] = useState<string[]>([]);
  const [hasMatched, setHasMatched] = useState(true);

  const ranked = useMemo(() => {
    const concepts = goalConcepts(goal);
    const directWords = goal.toLowerCase().split(/\W+/).filter((word) => word.length > 3);
    return careers.map((career) => {
      const skillHits = career.skills.filter((skill) => skills.includes(skill));
      const valueHits = career.values.filter((value) => values.includes(value));
      const conceptHits = career.concepts.filter((concept) =>
        concepts.includes(concept) || directWords.some((word) => concept.includes(word) || word.includes(concept)),
      );
      const styleHit = workStyle === 'Flexible' || career.workStyles.includes(workStyle);
      const score = Math.min(97, 48 + skillHits.length * 8 + valueHits.length * 5 + Math.min(conceptHits.length, 3) * 4 + (styleHit ? 3 : 0));
      return { ...career, score, skillHits, valueHits, conceptHits, styleHit };
    }).sort((a, b) => b.score - a.score);
  }, [goal, skills, values, workStyle]);

  const completion = Math.min(100, 20 + (goal.trim() ? 20 : 0) + Math.min(skills.length, 3) * 12 + Math.min(values.length, 2) * 8 + (level ? 4 : 0) + (workStyle ? 4 : 0));
  const comparedCareers = ranked.filter((career) => compare.includes(career.id));

  const toggleItem = (item: string, list: string[], setter: (items: string[]) => void) => {
    setter(list.includes(item) ? list.filter((value) => value !== item) : [...list, item]);
  };

  const reset = () => {
    setGoal(''); setSkills([]); setValues([]); setLevel('Starting out'); setWorkStyle('Flexible');
    setExpanded(null); setCompare([]); setHasMatched(false);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-white">
        <div className="mx-auto flex h-16 max-w-[1480px] items-center justify-between px-5 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-lg bg-primary text-primary-foreground"><Compass className="size-5" /></span>
            <div><span className="block text-base font-bold leading-none">Pathwise</span><span className="mt-1 hidden text-[10px] font-semibold uppercase text-muted-foreground sm:block">Semantic career intelligence</span></div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-2 text-xs font-medium text-muted-foreground sm:flex"><span className="size-2 rounded-full bg-teal-600" /> Matching engine ready</span>
            <Button aria-label="Reset profile" title="Reset profile" variant="outline" size="icon" onClick={reset}><RefreshCw /></Button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1480px] px-5 py-6 lg:px-8">
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-primary"><Sparkles className="size-4" /> Career matching workspace</p>
            <h1 className="max-w-3xl text-3xl font-bold leading-tight sm:text-4xl">Find work that fits how you think.</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">Map your strengths, motivations, and preferred ways of working to roles that use the same underlying capabilities.</p>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground"><BrainCircuit className="size-4 text-teal-700" /> Every match is explainable</div>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[390px_minmax(0,1fr)]">
          <aside className="rounded-lg border border-border bg-card shadow-sm lg:sticky lg:top-5">
            <div className="border-b border-border p-5">
              <div className="mb-3 flex items-center justify-between"><div><h2 className="font-semibold">Your profile</h2><p className="mt-1 text-xs text-muted-foreground">Tune the signals that shape your matches.</p></div><span className="text-sm font-bold text-primary">{completion}%</span></div>
              <div className="h-1 w-full overflow-hidden rounded-full bg-muted" role="progressbar" aria-label="Profile completion" aria-valuenow={completion} aria-valuemin={0} aria-valuemax={100}>
                <div className="h-full bg-primary transition-[width]" style={{ width: `${completion}%` }} />
              </div>
            </div>

            <div className="max-h-[calc(100vh-180px)] space-y-6 overflow-y-auto p-5">
              <div>
                <label className="mb-2 block text-xs font-semibold" htmlFor="goal">What would you like to do more of?</label>
                <Input id="goal" value={goal} onChange={(event) => setGoal(event.target.value)} className="h-11" placeholder="e.g. Help teams make better decisions" />
              </div>

              <fieldset>
                <legend className="mb-3 text-xs font-semibold">Skills you enjoy using</legend>
                <div className="grid grid-cols-2 gap-2">
                  {skillOptions.map((skill) => (
                    <label key={skill} className="flex min-h-10 cursor-pointer items-center gap-2 rounded-md border border-border px-3 text-xs font-medium transition-colors hover:bg-muted has-[[data-checked]]:border-teal-700 has-[[data-checked]]:bg-teal-50">
                      <Checkbox checked={skills.includes(skill)} onCheckedChange={() => toggleItem(skill, skills, setSkills)} /> {skill}
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className="mb-3 text-xs font-semibold">What matters in your work?</legend>
                <div className="grid grid-cols-3 gap-2">
                  {valueOptions.map((value) => (
                    <label key={value} className="flex min-h-9 cursor-pointer items-center justify-center gap-2 rounded-md border border-border px-2 text-xs font-medium transition-colors hover:bg-muted has-[[data-checked]]:border-primary has-[[data-checked]]:bg-orange-50">
                      <Checkbox className="sr-only" checked={values.includes(value)} onCheckedChange={() => toggleItem(value, values, setValues)} /> {values.includes(value) && <Check className="size-3" />}{value}
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className="mb-3 text-xs font-semibold">Experience</legend>
                <div className="grid grid-cols-2 gap-1 rounded-md bg-muted p-1">
                  {levels.map((item) => <button key={item} type="button" onClick={() => setLevel(item)} className={`min-h-8 rounded px-2 text-xs font-medium transition-colors ${level === item ? 'bg-white text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>{item}</button>)}
                </div>
              </fieldset>

              <fieldset>
                <legend className="mb-3 text-xs font-semibold">Preferred setting</legend>
                <div className="grid grid-cols-4 gap-1 rounded-md bg-muted p-1">
                  {workStyles.map((item) => <button key={item} type="button" onClick={() => setWorkStyle(item)} className={`min-h-8 rounded px-1 text-[11px] font-medium transition-colors ${workStyle === item ? 'bg-white text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>{item}</button>)}
                </div>
              </fieldset>

              <Button onClick={() => setHasMatched(true)} disabled={!goal.trim() || skills.length === 0} className="h-11 w-full" size="lg">Rank my careers <ArrowRight /></Button>
            </div>
          </aside>

          <section aria-label="Career recommendations" className="min-w-0">
            <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
              <div><h2 className="font-semibold">Top recommendations</h2><p className="mt-1 text-xs text-muted-foreground">{hasMatched ? `Ranked from ${careers.length} career patterns using your profile` : 'Complete your profile to generate matches'}</p></div>
              {compare.length > 0 && <span className="flex items-center gap-2 text-xs font-semibold text-teal-800"><GitCompareArrows className="size-4" /> {compare.length}/2 selected</span>}
            </div>

            {!hasMatched ? (
              <div className="grid min-h-[420px] place-items-center rounded-lg border border-dashed border-border bg-card px-6 text-center">
                <div className="max-w-sm"><span className="mx-auto mb-4 grid size-12 place-items-center rounded-lg bg-secondary text-secondary-foreground"><Target /></span><h3 className="font-semibold">Your next path starts with a few signals</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Add a goal and at least one skill, then rank your careers.</p></div>
              </div>
            ) : (
              <div className="space-y-3">
                {ranked.slice(0, 4).map((career, index) => {
                  const isExpanded = expanded === career.id;
                  const isCompared = compare.includes(career.id);
                  return (
                    <article key={career.id} className={`overflow-hidden rounded-lg border bg-card shadow-sm transition-colors ${index === 0 ? 'border-teal-700' : 'border-border'}`}>
                      <div className="grid gap-5 p-5 sm:grid-cols-[72px_minmax(0,1fr)_auto]">
                        <div className="grid size-[72px] place-items-center rounded-lg border border-border bg-muted/60 text-center">
                          <div><span className="block text-2xl font-bold text-teal-700">{career.score}%</span><span className="text-[10px] font-semibold uppercase text-muted-foreground">fit</span></div>
                        </div>
                        <div className="min-w-0">
                          <div className="mb-2 flex flex-wrap items-center gap-2">{index === 0 && <span className="rounded-full bg-teal-50 px-2.5 py-1 text-[10px] font-bold uppercase text-teal-800">Best match</span>}<span className="text-xs text-muted-foreground">{career.family}</span></div>
                          <h3 className="text-lg font-bold">{career.title}</h3>
                          <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{career.description}</p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {career.skillHits.slice(0, 3).map((item) => <span key={item} className="flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-xs font-medium"><Check className="size-3 text-teal-700" />{item}</span>)}
                            {career.skillHits.length === 0 && <span className="rounded-md bg-orange-50 px-2 py-1 text-xs font-medium text-orange-900">Fresh direction</span>}
                          </div>
                        </div>
                        <div className="flex items-start gap-2 sm:flex-col sm:items-end">
                          <label className="flex min-h-8 cursor-pointer items-center gap-2 rounded-md border border-border px-2.5 text-xs font-medium hover:bg-muted">
                            <Checkbox checked={isCompared} disabled={!isCompared && compare.length >= 2} onCheckedChange={() => setCompare(isCompared ? compare.filter((id) => id !== career.id) : [...compare, career.id])} /> Compare
                          </label>
                          <Button aria-label={`${isExpanded ? 'Hide' : 'Show'} details for ${career.title}`} variant="ghost" size="icon" onClick={() => setExpanded(isExpanded ? null : career.id)}>{isExpanded ? <ChevronUp /> : <ChevronDown />}</Button>
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="grid gap-5 border-t border-border bg-muted/35 px-5 py-4 md:grid-cols-3">
                          <div><p className="mb-2 flex items-center gap-2 text-xs font-bold"><Lightbulb className="size-4 text-primary" /> Why it fits</p><p className="text-xs leading-5 text-muted-foreground">Your profile aligns on {career.skillHits.length} skills, {career.valueHits.length} work values, and {Math.max(career.conceptHits.length, 1)} goal concepts.</p></div>
                          <div><p className="mb-2 flex items-center gap-2 text-xs font-bold"><BookOpen className="size-4 text-primary" /> Skills to bridge</p><div className="flex flex-wrap gap-1.5">{career.bridge.map((item) => <span key={item} className="rounded bg-white px-2 py-1 text-[11px] font-medium">{item}</span>)}</div></div>
                          <div><p className="mb-2 flex items-center gap-2 text-xs font-bold"><Target className="size-4 text-primary" /> First move</p><p className="text-xs leading-5 text-muted-foreground">{career.nextStep}</p></div>
                        </div>
                      )}

                      <div className="grid grid-cols-3 divide-x divide-border border-t border-border px-5 py-3 text-xs">
                        <span className="flex items-center gap-2"><TrendingUp className="size-3.5 text-teal-700" /><span><strong className="block">{career.outlook}</strong><span className="text-[10px] text-muted-foreground">Outlook</span></span></span>
                        <span className="flex items-center justify-center gap-2"><CircleDollarSign className="size-3.5 text-teal-700" /><span><strong className="block">{career.range}</strong><span className="text-[10px] text-muted-foreground">Illustrative US range</span></span></span>
                        <span className="flex items-center justify-end gap-2"><MapPin className="size-3.5 text-teal-700" /><span><strong className="block">{career.workStyles[0]}</strong><span className="text-[10px] text-muted-foreground">Common setting</span></span></span>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}

            {comparedCareers.length === 2 && (
              <section className="mt-6 border-y border-border bg-white py-5" aria-label="Career comparison">
                <div className="mb-4 flex items-center justify-between"><div><p className="flex items-center gap-2 text-sm font-bold"><GitCompareArrows className="size-4 text-primary" /> Side-by-side fit</p><p className="mt-1 text-xs text-muted-foreground">A quick comparison using your current priorities.</p></div><Button variant="ghost" size="sm" onClick={() => setCompare([])}>Clear</Button></div>
                <div className="grid grid-cols-[110px_repeat(2,minmax(0,1fr))] overflow-hidden rounded-lg border border-border text-xs">
                  <div className="bg-muted p-3 font-semibold">Career</div>{comparedCareers.map((career) => <div key={career.id} className="border-l border-border p-3 font-bold">{career.title}</div>)}
                  <div className="border-t border-border bg-muted p-3 font-semibold">Fit score</div>{comparedCareers.map((career) => <div key={career.id} className="border-l border-t border-border p-3 text-lg font-bold text-teal-700">{career.score}%</div>)}
                  <div className="border-t border-border bg-muted p-3 font-semibold">Strengths</div>{comparedCareers.map((career) => <div key={career.id} className="border-l border-t border-border p-3 leading-5 text-muted-foreground">{career.skillHits.join(', ') || 'New capabilities to explore'}</div>)}
                  <div className="border-t border-border bg-muted p-3 font-semibold">Next step</div>{comparedCareers.map((career) => <div key={career.id} className="border-l border-t border-border p-3 leading-5 text-muted-foreground">{career.nextStep}</div>)}
                </div>
              </section>
            )}

            <div className="mt-6 grid gap-3 border-t border-border pt-5 sm:grid-cols-3">
              <div className="flex gap-3"><BarChart3 className="mt-0.5 size-4 text-primary" /><div><p className="text-xs font-bold">Meaning over keywords</p><p className="mt-1 text-[11px] leading-5 text-muted-foreground">Related concepts can surface adjacent careers.</p></div></div>
              <div className="flex gap-3"><Users className="mt-0.5 size-4 text-primary" /><div><p className="text-xs font-bold">Transferable strengths</p><p className="mt-1 text-[11px] leading-5 text-muted-foreground">Your capabilities carry across industries.</p></div></div>
              <div className="flex gap-3"><Lightbulb className="mt-0.5 size-4 text-primary" /><div><p className="text-xs font-bold">Transparent scoring</p><p className="mt-1 text-[11px] leading-5 text-muted-foreground">Every recommendation shows its evidence.</p></div></div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
