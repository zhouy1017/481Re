all_per = pd.concat([ref_df['AppPermission'],test_df['AppPermission']])
all_per_list = all_per.tolist()
unique_per_list = []
for p in all_per_list:
    p_list = p.split(',')
    for q in p_list:
        if(q not in unique_per_list):
            unique_per_list.append(q)
unique_per_list

