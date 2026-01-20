import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { m } from '@/paraglide/messages';
import { ExternalLink, Github, HeartHandshake } from 'lucide-react';

import { SettingsSection } from './settings-section';

const PATREON_URL = 'https://www.patreon.com/OpenAthlete';
const GITHUB_REPO_URL = 'https://github.com/openathleteorg/openathlete';

export function ContributeTab() {
  return (
    <div className="space-y-6">
      <SettingsSection
        title={m.contribute()}
        description={m.contribute_tab_description()}
        contentClassName="pt-6"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HeartHandshake className="h-4 w-4" />
                {m.support_the_project()}
              </CardTitle>
              <CardDescription>
                {m.support_the_project_description()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <a href={PATREON_URL} target="_blank" rel="noreferrer">
                  {m.open_patreon()} <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Github className="h-4 w-4" />
                {m.contribute_on_github()}
              </CardTitle>
              <CardDescription>
                {m.contribute_on_github_description()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" asChild>
                <a href={GITHUB_REPO_URL} target="_blank" rel="noreferrer">
                  {m.open_github()} <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </SettingsSection>
    </div>
  );
}
