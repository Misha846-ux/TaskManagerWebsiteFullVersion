import type { CompanyGet, CompanyPost, CompanyUpdate } from '../../../../Domain/Company';
import { useEffect, useState } from 'react';
import ActionsMenu from '../../../Pages/MultiUsedParts/ActionsMenu';
import '../../../Styles/GeneralComponentsStyles/SideBar/CompaniesBox.css';
import { addCompany, deleteCompanyById, getMyCompanies, updateCompany } from '../../../../Infrastructure/ControllersMethods/CompanyControllerMethods';
import { getCompanyId, setAccessToken, setCompanyId } from '../../../../Infrastructure/LocalStorageMethods';
import { useNavigate } from 'react-router-dom';
import { refreshAccessToken } from '../../../../Infrastructure/ControllersMethods/AuthorizationControllerMethods';
import OneInputMenu from '../../../Pages/MultiUsedParts/OneInputMenu';


const CompaniesBox = () => {
  const [companies, setCompanies] = useState<CompanyGet[]>([]);
  const [isCreateMenuOpen, setIsCreateMenuOpen] = useState<boolean>(false);
  let companyId = getCompanyId();

  useEffect(() => {
    getMyCompanies().then((data) => setCompanies(data));
  }, [companyId]);

  function CreateCompany(companyName: string){
    setIsCreateMenuOpen(false);

    let newCompany: CompanyPost = {
      Name: companyName,
      Description: "No description"
    }

    addCompany(newCompany).then(()=>{
      getMyCompanies().then((data) => setCompanies(data));
    })

  }


  return (
    <>
      <OneInputMenu isOpen={isCreateMenuOpen}
            onClose={() => setIsCreateMenuOpen(false)}
            onSubmit={CreateCompany}
            title="Create Company"
            placeholder="Enter company name"
            buttonText="create"
            label="Company Name"
            />
      <button className="Company_create_button" 
        onClick={() => setIsCreateMenuOpen(true)}>
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
              key={company.id}
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
    const [isCreateMenuOpen, setIsCreateMenuOpen] = useState<boolean>(false);
    const navigator = useNavigate();

    function onCompanyClick(companyId: number): void {
        setCompanyId(companyId);

        refreshAccessToken(companyId).then((value) => {
            setAccessToken(value);
        });

        window.dispatchEvent(new Event("companyChanged"));
    }

    function onDeleteCompany(companyId: number): void {
      deleteCompanyById(companyId).then(() => {
        setCompanyId(getCompanyId());
      });
    }

    function onUpdateCompany(companyName: string): void {
      let newCompany: CompanyUpdate = {
        id: company.id,
        name: companyName,
        description: company.description
      }
      setIsCreateMenuOpen(false);
      updateCompany(newCompany).then(() => {
        setCompanyId(getCompanyId());
      });
    }

    return (
      <>
      <OneInputMenu isOpen={isCreateMenuOpen}
            onClose={() => setIsCreateMenuOpen(false)}
            onSubmit={onUpdateCompany}
            title="Update Company"
            placeholder="Enter company name"
            buttonText="Update"
            label="Company Name"
            />
      <div key={company.id} className="Company" style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: '5px', right: '5px' }}>
                <ActionsMenu
                    entityId={company.id}
                    onDelete={()=> onDeleteCompany(company.id)}
                    onUpdate={(id: string | number) => setIsCreateMenuOpen(true)}
                />
            </div>
            <div className="Company_top">Company name</div> 
            <div className="Company_profile">
                <div className="Company_name">
                    <b>{company.name}</b>
                </div>
                <div className="Company_img" onClick={() => onCompanyClick(company.id)}>
                    <img className="comp_img" src="/company_img.png" alt="Company" />
                </div>
            </div>
        </div>
      </>
    )
  
};

export default CompaniesBox;