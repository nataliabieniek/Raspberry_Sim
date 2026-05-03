import { userModuleDescription } from '../model/userModuleDescription';

export function UsersSummaryCard() {
  return (
    <article className="info-box">
      <h2>Modul uzytkownikow</h2>
      <p>{userModuleDescription}</p>
      <ul className="simple-list">
        <li>logowanie i sesje</li>
        <li>profile uzytkownikow</li>
        <li>role i uprawnienia</li>
        <li>integracja z REST API</li>
      </ul>
    </article>
  );
}
