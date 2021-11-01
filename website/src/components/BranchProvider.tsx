import { ReactNode } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function BranchProvider({
  children,
}: {
  children(branch: string): ReactNode;
}) {
  const ctx = useDocusaurusContext();

  return children(ctx.siteConfig.customFields.branch as string);
}
