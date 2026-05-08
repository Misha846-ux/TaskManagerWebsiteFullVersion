import type { CompanyGet } from '../../../../Domain/Company';
import { useEffect, useState } from 'react';
import ActionsMenu from '../../../Pages/MultiUsedParts/ActionsMenu';
import '../../../Styles/GeneralComponentsStyles/SideBar/CompaniesBox.css';
import { getMyCompanies } from '../../../../Infrastructure/ControllersMethods/CompanyControllerMethods';
import { setAccessToken, setCompanyId } from '../../../../Infrastructure/LocalStorageMethods';
import { useNavigate } from 'react-router-dom';
import { refreshAccessToken } from '../../../../Infrastructure/ControllersMethods/AuthorizationControllerMethods';


const CompaniesBox = () => {
  const [companies, setCompanies] = useState<CompanyGet[]>([]);

  useEffect(() => {
    getMyCompanies().then((data) => setCompanies(data));
    
  }, []);

  return (
    <>
      <button className="Company_create_button">
        Create +
      </button>
      <div className="Companies_list">
        {!companies.length ? (
          <div className="No_companies">
            <b>No companies</b>
          </div>
        ) : (
          companies.map((company) => (
            <CompanyCard
              key={company.Id}
              company={company}
            />
          ))
        )}
      </div>
    </>
  );
};

type CompanyCardProps = {
    company: CompanyGet;
}

const CompanyCard = ({company}: CompanyCardProps) => {
    const navigator = useNavigate();

    function onCompanyClick(companyId: number): void {
        setCompanyId(companyId);

        refreshAccessToken(companyId).then((value) => {
            setAccessToken(value);
        });

        navigator(`/MainPage/MainContent`);
    }

    return (
        <div key={company.Id} className="Company" style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: '5px', right: '5px' }}>
                <ActionsMenu
                    entityId={company.Id}
                    onDelete={(id: string | number) => console.log('delete', id)}
                    onUpdate={(id: string | number) => console.log('update', id)}
                />
            </div>
            <div className="Company_top">Company name</div> 
            <div className="Company_profile">
                <div className="Company_name">
                    <b>{company.Name}</b>
                </div>
                <div className="Company_img" onClick={() => onCompanyClick(company.Id)}>
                    <img className="comp_img" src="/company_img.png" alt="Company" />
                </div>
            </div>
        </div>
    )
  
};

export default CompaniesBox;