import LayoutWithSidebarCandidate from "@/components/Layout/LayoutWithSidebarCandidate"
import PostulantionDocumentPage from "../postulationDocument"


function OfferSelected() {
  return (
    <LayoutWithSidebarCandidate>
      <div className="mx-10 text-sm">
        <PostulantionDocumentPage />
      </div>
    </LayoutWithSidebarCandidate>
  )
}

export default OfferSelected