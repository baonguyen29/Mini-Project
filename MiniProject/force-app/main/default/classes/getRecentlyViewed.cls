public class getRecentlyViewed {
    
    @AuraEnabled
    //get Acc, Con, Opp records in the Recently Viewed object by id, name, phone, sort by Last viewed date
    public static List<sObject> getRecords () {
        return [SELECT Id, Name, Phone 
                FROM RecentlyViewed 
				WHERE Type IN ('Account', 'Contact', 'Opportunity')
				ORDER BY LastViewedDate DESC 
                LIMIT 20];
    }

}