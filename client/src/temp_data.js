import { Component } from 'react';

class Temp_data extends Component {
    constructor(props) {
        super(props);
        
        this.updated = false;
        this.query_condition = [{'params': {"app.Cover Letter": "true"}}, {'params': {"app.Cover Letter": "false"}}];
        this.query_properties = [{'properties': {'sort': 'true'}}, {'properties': {'sort': 'false'}}]
        this.current_condition = {};
        this.temp_data_ignore = {
            'posting_id': '156914',
            'company_name': 'Bell Media - Head Office',
            'overview': {
                'Work Term': '2020 - Spring',
                'Job_Title': 'Technical Account Coordinator', 
                'Level': 'Junior\n\n\nIntermediate', 
                'Job - City': 'Toronto', 
                'Job - Province / State': 'Ontario', 
                'Job - Country': 'Canada', 
                'Work Term Duration': '8 month consecutive work term required', 
                'Required Skills': 'Requirements:\n\nA keen interest in digital advertising (e.g. IAB) -\xa0preferred\nKnowledge of digital ad servers (DFP) and third party vendors -\xa0preferred\nUnderstanding of digital advertising tech (e.g. VAST, Javascript/HTML5 tags) -\xa0preferred\nMS Office, PowerPoint and Excel applications'
                }, 
                'app': {
                    'Application Deadline': 'Mar 17, 2020 09:00:00 AM', 
                    'Application Documents Required': [
                        'University of Waterloo Co-op Work History',
                        'Résumé',
                        'Grade Report'
                    ]
                }, 
                'work_term_ratings': {
                    'by_work_term': {
                        'First': 5, 
                        'Second': 19, 
                        'Third': 29, 
                        'Fourth': 24, 
                        'Fifth': 19, 
                        'Sixth +': 5
                    },
                    'by_program': {
                        'Economics': 3, 
                        'Environment & Business': 3, 
                        'Social Development Studies': 3, 
                        'Chemistry': 2, 
                        'Computing and Financial Management': 2, 
                        'English': 2, 
                        'Nanotechnology Engineering': 2, 
                        'Science & Business': 2, 
                        'Global Business & Digital Arts': 1, 
                        'Physics': 1
                    }
                }
        };
        this.data = [this.temp_data_ignore];
        for (var i = 0; i < 20; i++) {
            this.data.push(this.temp_data_ignore);
        }

    }
}

export default Temp_data;
