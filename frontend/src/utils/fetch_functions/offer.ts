import { Offer } from "@/types/offers";
import { pb } from "../pocketbase";

export async function getOffers(setOffers: (e: Offer[])=>void) {
    try {
        const records = await pb.collection('Offer').getFullList<Offer>({
            sort: '-created',
            expand: "period,contractType,wideField,specificField,site,department,academicStaff,activity"
        });
        setOffers(records)
    } catch (error) {
        
    }
}