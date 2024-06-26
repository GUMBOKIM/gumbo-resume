import styled from "styled-components";

export interface ProjectInfoProps {
    companyName: string;
    projects: {
        role: string;
        title: string;
        period: string;
        techStack: string;
        link?: string;
        description: string;
    }[]
}

export const CompanyInfo = ({companyName, projects}: ProjectInfoProps) => {
    return (
        <CompanySection>
            <CompanyName>{companyName}</CompanyName>
            {
                projects.map((project, index) => (
                        <>
                            <ProjectDivide/>
                            <ProjectSection key={project.title + index}>
                                <ProjectInfoSection>
                                    <ProjectRole>{project.role}</ProjectRole>
                                    <ProjectTitle>{project.title}</ProjectTitle>
                                    <ProjectPeriod>{project.period}</ProjectPeriod>
                                    <ProjectTechStack>{project.techStack}</ProjectTechStack>
                                    <ProjectLink>{project.link}</ProjectLink>
                                </ProjectInfoSection>
                                <ProjectDescription>{project.description}</ProjectDescription>
                            </ProjectSection>
                        </>
                    )
                )
            }
        </CompanySection>
    )
}

const CompanySection = styled.section`
  position: relative;
  width: 90%;
  min-width: 200px;
  max-width: 600px;
  margin-bottom: 2rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const CompanyName = styled.h2`
  width: 100%;
  font-size: 0.5rem;
`

const ProjectDivide = styled.div`
  width: 100%;
  height: 0.1rem;
  margin: 1rem 0;

  background-color: dimgrey;
`

const ProjectSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  text-align: left;
`;

const ProjectInfoSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;
`

const ProjectRole = styled.div`
  font-size: 0.5rem;
`

const ProjectTitle = styled.div`
  font-size: 0.5rem;
`

const ProjectLink = styled.div`
  font-size: 0.5rem;
`;

const ProjectPeriod = styled.div`
  font-size: 0.5rem;
`

const ProjectTechStack = styled.div`
  font-size: 0.5rem;
  color: dimgrey;
`

const ProjectDescription = styled.p`
  font-size: 0.5rem;
  width: 100%;
  text-align: left;
  word-break: keep-all;
  word-wrap: break-word;
  white-space: pre-wrap;
`