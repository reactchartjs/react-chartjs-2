import React from 'react';
import Link from '@docusaurus/Link';
import { useDynamicImport } from 'docusaurus-plugin-react-docgen-typescript/pkg/dist-src/hooks/useDynamicImport';

function clean(description: string) {
  return description.replace(/\n@.*/g, '');
}

function see(description: string) {
  const results = description.match(/@see (.*)/);

  if (!results) {
    return null;
  }

  const [, link] = results;

  return (
    <>
      <br />
      <Link href={link}>See more</Link>
    </>
  );
}

export default function PropsTable({ component }: { component: string }) {
  const props = useDynamicImport(component);

  if (!props) {
    return null;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Default Value</th>
          <th>Required</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(props).map(key => {
          return (
            <tr key={key}>
              <td>
                <code>{key}</code>
              </td>
              <td>
                <code>{props[key].type?.name}</code>
              </td>
              <td>
                {props[key].defaultValue && (
                  <code>{props[key].defaultValue.value}</code>
                )}
              </td>
              <td>{props[key].required ? 'Yes' : 'No'}</td>
              <td>
                {clean(props[key].description)}
                {see(props[key].description)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
