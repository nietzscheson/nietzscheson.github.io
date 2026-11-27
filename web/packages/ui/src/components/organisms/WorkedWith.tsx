import { CompanyList } from "../molecules/CompanyList";

export function WorkedWith({ companies }: { companies: string[] }) {
  return (
    <div className="mx-auto w-full max-w-page px-4 pb-14 sm:px-8">
      <div className="md:ml-[calc(12rem+3rem)]">
        <CompanyList companies={companies} />
      </div>
    </div>
  );
}
